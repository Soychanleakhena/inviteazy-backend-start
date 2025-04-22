
export interface IEvent {
    id?: string;
    user_id : string;
    name: string;
    datetime: Date;
    location: string;
    description: string;
  }
  
  
  export interface IEventRepository {
    findAll(): Promise<IEvent[]>;  // Ensure it's asynchronous
    create(event: Omit<IEvent, "id">): Promise<IEvent>;
  }
  
  
  export interface IEventService {
    getAllEvent(): Promise<IEvent[]>;
    createEvent(
      event: Omit<IEvent, "id">
    ): Promise<IEvent>;
  }

  