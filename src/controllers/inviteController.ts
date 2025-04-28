import { NextFunction, Request, Response } from "express";
import { IInvitee, IInviteeWithoutId, IInviteeService } from "../interfaces/inviteInterface";

export class InviteesController {
    constructor(private inviteesService: IInviteeService) { }

    async getAllInvitees(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.inviteesService.findAll();
            res.json({ message: "Get all invitees", data: result });
        } catch (error) {
            next(error);
        }
    }

    async getInviteeById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const result = await this.inviteesService.findById(id);
            res.json({ message: "Get invitee by Id", data: result });
        } catch (error) {
            next(error);
        }
    }

    async createInvitee(req: Request, res: Response, next: NextFunction) {
        try {
            const { event_id } = req.params;
            const {user_id}  = req.body;
            console.log("===>", event_id, user_id);
            const newInvitee = await this.inviteesService.create({
                event_id,
                user_id,
                status: 'pending', // or 'invited', depending on your logic
                qr_code: "https://example.com/qr", // or leave it blank if backend handles it
                is_checked_in: false,
                checked_in_at: null,
              });
              
            res.status(201).json({ message: "New invitee created", data: newInvitee });
        } catch (error) {
            next(error);
        }
    }

    async updateInvitee(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const invitee: Partial<IInviteeWithoutId> = req.body;
            console.log('Request body:', invitee);

            if (Object.keys(invitee).length === 0) {
                throw Object.assign(new Error('Request body is empty'), { status: 400 });
            }

            const updatedInvitee = await this.inviteesService.update(id, invitee);
            if (!updatedInvitee) {
                throw Object.assign(new Error('Invitee not found'), { status: 404 });
            }
            res.json({ message: 'Invitee updated successfully', data: updatedInvitee });
        } catch (error) {
            next(error);
        }
    }

    async updateInviteeStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { inviteeId } = req.params;
            const { status } = req.body;

            const validStatuses = ['accept', 'maybe', 'no', 'busy'];
            if (!validStatuses.includes(status)) {
                throw Object.assign(new Error("Invalid status value"), { status: 400 });
            }

            const updatedInvitee = await this.inviteesService.update(inviteeId, { status });
            if (!updatedInvitee) {
                throw Object.assign(new Error("Invitee not found"), { status: 404 });
            }

            res.json({ message: "Invitee status updated successfully", data: updatedInvitee });
        } catch (error) {
            next(error);
        }
    }

    async deleteInvitee(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.inviteesService.delete(id);
            res.status(200).json({ message: "Invitee deleted successfully" });
        } catch (error) {
            next(error);
        }
    }

    async getInviteesByEventId(req: Request, res: Response, next: NextFunction) {
        try {
          const { event_id } = req.params;
      
          if (!event_id) {
            res.status(400).json({ message: "Event ID is required" });
            return;
          }
      
          const result = await this.inviteesService.findInviteeByEventId(event_id);
          res.status(200).json({ message: "Get invitees by event ID", data: result });
        } catch (error) {
          next(error);
        }
      }

      async countInviteeStatusByEventId(req: Request, res: Response, next: NextFunction) {
        try {
            const { event_id } = req.params;
            const result = await this.inviteesService.countInviteeStatusByEventId(event_id);
            res.status(200).json({ message: "Count invitee status by event ID", data: result });
        } catch (error) {
            next(error);
        }
      
    }
}