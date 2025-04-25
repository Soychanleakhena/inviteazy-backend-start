import { Pool } from "pg";
import { queryWithLogging } from "./utils";
import { IEventRepository, IEvent } from "../../interfaces/eventInterface";

export class PostgresEventRepository implements IEventRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<IEvent[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      "SELECT id,  user_id, event_name, event_datetime, location, description FROM events"
    );
    return rows;
  }

  async create(event: Omit<IEvent, "id">): Promise<IEvent> {
    console.log("================== Creating event in repo:", event);
    const { rows } = await queryWithLogging(
      this.pool,
      `
      INSERT INTO events (user_id, event_name, event_datetime, location, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        event.user_id,
        event.event_name,            // ✅ This must match your interface
        event.event_datetime,
        event.location,
        event.description,
      ]
    );
    return rows[0];
  }

  async findByUserId(user_id: string): Promise<IEvent[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      "SELECT id, user_id, event_name, event_datetime, location, description FROM events WHERE user_id = $1",
      [user_id]
    );
    return rows;
  }
}
