import {
    IEvent,
    IEventRepository,
    IEventService,
  } from "../interfaces/eventInterface";
  
  export class EventService implements IEventService {
    constructor(private eventRepository: IEventRepository) {}
    
    async getAllEvent(): Promise<IEvent[]> {
      return await this.eventRepository.findAll();
    }
  
    async createEvent(event: Omit<IEvent, "id">): Promise<IEvent> {
      const createdEvent = await this.eventRepository.create(event);
      return createdEvent;
    }
  }
  