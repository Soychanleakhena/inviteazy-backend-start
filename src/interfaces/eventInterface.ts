
export interface IEvent {
  id?: string;
  user_id: string;
  event_name: string;
  event_datetime: Date;
  location: string;
  description: string;
}

  
  
  export interface IEventRepository {
    findAll(): Promise<IEvent[]>;  // Ensure it's asynchronous
    create(event: Omit<IEvent, "id">): Promise<IEvent>;
    // create1(event: Omit<IEvent, "id">): Promise<IEvent|null>;
    findByUserId(user_id: string): Promise<IEvent[]>;
  }
  
  
  export interface IEventService {
    getAllEvent(): Promise<IEvent[]>;
    createEvent(
      event: Omit<IEvent, "id">
    ): Promise<IEvent>;
    getEventByUserId(user_id: string): Promise<IEvent[]>;
  }

  