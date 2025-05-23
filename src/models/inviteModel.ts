import mongoose, { Schema, Document } from "mongoose";
import { InvitationStatus } from '../utils/enum'

export interface IInvitee extends Document {
    event_id: string; 
    user_id: string; 
    status: InvitationStatus
    qr_code: string; 
    is_checked_in: boolean;
    checked_in_at: Date | null; 
    created_at?: Date; 
}

const inviteeSchema: Schema = new Schema(
    {
        event_id: { type: String, required: true },
        user_id: { type: String, required: true },
        status: { type: String, enum: InvitationStatus, required: true },
        qr_code: { type: String, required: true },
        is_checked_in: { type: Boolean, default: false },
        checked_in_at: { type: Date, default: null },
        is_checked_out: { type: Boolean, default: false }, 
        checked_out_at: { type: Date, default: null }, 
        gift: { type: String, default: null },
        created_at: { type: Date, default: Date.now }
    }
);

export const InviteeModel = mongoose.model<IInvitee>("Invitee", inviteeSchema);