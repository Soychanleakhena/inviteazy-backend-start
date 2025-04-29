import { Pool } from "pg";
import { IInvitee, IInviteeRepository, IInviteeWithoutId } from "../../interfaces/inviteInterface";
import { queryWithLogging } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { InvitationStatus } from "../../utils/enum";

export class PostgresInviteesRepository implements IInviteeRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async findAll(): Promise<IInvitee[]> {
        const { rows } = await queryWithLogging(this.pool, "SELECT * FROM invitees");
        return rows;
    }

    async findById(id: string): Promise<IInvitee | null> {
        const { rows } = await queryWithLogging(this.pool, "SELECT * FROM invitees WHERE id = $1", [id]);
        return rows[0] || null;
    }

    async findByEventId(event_id: string): Promise<IInvitee[]> {
        const { rows } = await queryWithLogging(this.pool, "SELECT * FROM invitees WHERE event_id = $1", [event_id]);
        return rows;
    }

    async findByUserId(user_id: string): Promise<IInvitee[]> {
        const { rows } = await queryWithLogging(this.pool, "SELECT * FROM invitees WHERE user_id = $1", [user_id]);
        return rows;
    }

    async create(invitee: IInviteeWithoutId): Promise<IInvitee> {
        const created_at = new Date();  
        const status = invitee.status || 'pending'; 
        const qr_code = invitee.qr_code || `https://example.com/qr`; 
        const is_checked_in = invitee.is_checked_in ?? false; 
        const checked_in_at = invitee.checked_in_at ?? null; 
        const is_checked_out = invitee.is_checked_out ?? false; 
        const checked_out_at = invitee.checked_out_at ?? null;
        const gift = invitee.gift ?? null;
    
        const query = `
            INSERT INTO invitees (event_id, user_id, status, qr_code, is_checked_in, checked_in_at, is_checked_out, checked_out_at, gift, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *`;
    
        const values = [
            invitee.event_id,
            invitee.user_id,
            status,
            qr_code,
            is_checked_in,
            checked_in_at,
            is_checked_out, 
            checked_out_at, 
            gift,
            created_at
        ];
    
        const { rows } = await queryWithLogging(this.pool, query, values);
        return rows[0];
    }
    


    async update(id: string, status:InvitationStatus): Promise<IInvitee | null> {
        const { rows } = await queryWithLogging(
            this.pool,
            
             ` UPDATE invitees
              SET status = $1
              WHERE id = $2
              RETURNING *`
            ,
            [status, id]
          );
          return rows[0] || null;
     

    }

    async delete(id: string): Promise<void> {
        await queryWithLogging(this.pool, "DELETE FROM invitees WHERE id = $1", [id]);
    }

    async findInviteeByEventId(event_id: string): Promise<IInvitee[]> {
        const { rows } = await queryWithLogging(this.pool, "SELECT user_id, status FROM invitees WHERE event_id = $1", [event_id]);
        return rows;
    }

  async countInviteeStatusByEventId(event_id: string): Promise<{ status: string, count: number }[]> {
  const { rows } = await queryWithLogging(
    this.pool,
    `
    SELECT status, COUNT(*) as count
    FROM invitees
    WHERE event_id = $1
    GROUP BY status
    `,
    [event_id]
  );
  return rows;
}

async checkin(event_id: string, user_id: string): Promise<IInvitee> {
    const { rows } = await queryWithLogging(
        this.pool,
        `
          UPDATE invitees
          SET is_checked_in = true, checked_in_at = NOW()
          WHERE event_id = $1 AND user_id = $2
          RETURNING *`,
        [event_id, user_id]
    );
    // if (rows.length === 0) {
    //     throw new Error("No invitee found for the given event_id and user_id");
    // }
    return rows[0];
}
async checkout(event_id: string, user_id: string, gift: string): Promise<IInvitee> {
    // First, check if the invitee has already checked in
    const { rows } = await queryWithLogging(
        this.pool,
        "SELECT * FROM invitees WHERE event_id = $1 AND user_id = $2",
        [event_id, user_id]
    );

    if (rows.length === 0) {
        throw new Error("No invitee found for the given event_id and user_id");
    }

    const invitee = rows[0];

    // If the invitee is not checked in, prevent checkout
    if (!invitee.is_checked_in) {
        throw new Error("Cannot checkout. Please check-in first.");
    }

    // Proceed with checkout if checked-in
    const updateQuery = `
        UPDATE invitees
        SET 
            is_checked_out = true, 
            checked_out_at = NOW(), 
            gift = $3
        WHERE event_id = $1 AND user_id = $2
        RETURNING *`;

    const { rows: updatedRows } = await queryWithLogging(
        this.pool,
        updateQuery,
        [event_id, user_id, gift]
    );

    if (updatedRows.length === 0) {
        throw new Error("No invitee found for the given event_id and user_id during checkout");
    }

    return updatedRows[0];
}


}



