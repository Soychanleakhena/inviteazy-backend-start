// import { EventModel } from "../../models/eventModel";
// import { IEvent, IEventRepository } from "../../interfaces/eventInterface";

// export class MongoEventRepository implements IEventRepository {

//   async create(event: Omit<IEvent, "id">): Promise<Omit<IEvent, "id">> {
//     const newEvent = new EventModel({
//       name: event.name,
//       datetime: event.datetime,
//       location: event.location,
//       description: event.description,
//     });
    
//     await newEvent.save();
//     console.log("Event created:", newEvent);

    
//     const { name, datetime, location, description } = newEvent;
//     return {  name, datetime, location, description };
//   }
// }
