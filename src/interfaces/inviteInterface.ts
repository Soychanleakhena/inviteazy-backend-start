import { InvitationStatus } from '../utils/enum'
export interface IInvitee {
    id?: string;
    event_id: string;
    user_id: string;
    status: InvitationStatus;
    qr_code: string;
    is_checked_in: boolean;
    checked_in_at: Date | null;
    checked_out_at: Date | null;  
    is_checked_out: boolean;  
    gift: string | null;
    created_at?: Date;
}

export interface IInviteeWithoutId extends Omit<IInvitee, 'id' | 'created_at'> {
    event_id: string;
    status: InvitationStatus
    qr_code: string;
    is_checked_in: boolean;
    checked_in_at: Date | null;
    checked_out_at: Date | null;  
    is_checked_out: boolean;  
    gift: string | null;
}


export interface IInviteeRepository {
    findAll(): Promise<IInvitee[]>;
    findById(id: string): Promise<IInvitee | null>;
    findByEventId(event_id: string): Promise<IInvitee[]>;
    findByUserId(user_id: string): Promise<IInvitee[]>;
    create(invitee: IInviteeWithoutId): Promise<IInvitee>;
    update(id: string, status: InvitationStatus): Promise<IInvitee | null>;
    delete(id: string): Promise<void>;
    findInviteeByEventId(event_id: string): Promise<IInvitee[]>;
    countInviteeStatusByEventId(event_id: string): Promise<{ status: string, count: number }[]>;
   checkin(event_id:string,user_id:string):Promise<IInvitee>;
   checkout(event_id: string, user_id: string, gift: string): Promise<IInvitee>;
}

export interface IInviteeService extends IInviteeRepository {
    countInviteeStatusByEventId(event_id: string):  Promise<{ status: string, count: number }[]>;
    findInviteeByEventId(event_id: string): Promise<IInvitee[]>;
    checkin(event_id:string,user_id:string):Promise<IInvitee> ;
    checkout(event_id: string, user_id: string, gift: string): Promise<IInvitee>;
}