import { Pool } from "pg";
import bcrypt from "bcrypt";
import { IUser, IUserRepository } from "../../interfaces/userInterface";
import { queryWithLogging } from "./utils";

export class PostgresUserRepository implements IUserRepository {
  constructor(private pool: Pool) {}

  async findAll(): Promise<IUser[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT id, fullname, email, role, phone_number, profile_picture, address FROM users`
    );
    return rows;
  }

  async findById(id: string): Promise<IUser | null> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT id, fullname, email, role, phone_number, profile_picture, address FROM users WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    return rows[0] || null;
  }

  async create(user: Omit<IUser, "id">): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const { rows } = await queryWithLogging(
      this.pool,
      `INSERT INTO users (fullname, email, password, role, phone_number, profile_picture, address)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, fullname, email, role, phone_number, profile_picture, address`,
      [
        user.fullname,
        user.email,
        hashedPassword,
        user.role,
        user.phone_number,
        user.profile_picture,
        user.address,
      ]
    );
    return rows[0];
  }
}
