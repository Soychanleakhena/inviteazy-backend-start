import { Pool } from "pg";
import { queryWithLogging } from "./utils";
import { IEventRepository } from "../../interfaces/eventInterface";
import { IEvent } from "../../models/eventModel";

export class PostgresEventRepository implements IEventRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<IEvent[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      "SELECT id, user_id, name, datetime , location, description FROM events"
    );
    return rows;
  }

  
  async create(event: Omit<IEvent, "id">): Promise<IEvent> {
    const { rows } = await queryWithLogging(
      this.pool,
      "INSERT INTO events (user_id, name, datetime , location, description) VALUES ($1, $2, $3, $4, $5) RETURNING id, user_id, name, datetime, location, description",
        [event.user_id, event.name, event.datetime, event.location, event.description]
      
    );
    return rows[0];
  }
}

