import { Router } from 'express';
import { InviteesController } from '../controllers/inviteController';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
    validateIdInURLParam,
} from '../middlewares/validationMiddleware';

export default function inviteesRoutes(controller: InviteesController): Router {
    const router = Router();

    router.get('/invitations', authMiddleware, controller.getAllInvitees.bind(controller));
    router.get('/:id', authMiddleware, validateIdInURLParam, controller.getInviteeById.bind(controller));
    router.post('/events/:event_id/invite', authMiddleware, controller.createInvitee.bind(controller));
    router.put('/:id', authMiddleware, validateIdInURLParam, controller.updateInvitee.bind(controller));
    router.delete('/:id', authMiddleware, validateIdInURLParam, controller.deleteInvitee.bind(controller));
    router.get('/:event_id/invitee', authMiddleware, controller.getInviteesByEventId.bind(controller));
    router.patch('invitation/:id/status',authMiddleware,controller.updateInvitee.bind(controller));
    router.get('/:event_id/invite', authMiddleware, controller.getInviteesByEventId.bind(controller));
    router.get('/events/:event_id/status', authMiddleware, controller.countInviteeStatusByEventId.bind(controller));
    router.patch('/checkin/:event_id/:user_id', authMiddleware, controller.checkin.bind(controller));
    router.patch('/checkout/:event_id/:user_id', authMiddleware, controller.checkout.bind(controller));

    return router;
}