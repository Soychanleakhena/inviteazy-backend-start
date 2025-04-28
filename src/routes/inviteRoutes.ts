import { Router } from 'express';
import { InviteesController } from '../controllers/inviteController';
import { authMiddleware } from '../middlewares/authMiddleware';
import {
    validateIdInURLParam,
} from '../middlewares/validationMiddleware';

export default function inviteesRoutes(controller: InviteesController): Router {
    const router = Router();

    router.get('/', authMiddleware, controller.getAllInvitees.bind(controller));
    router.get('/:id', authMiddleware, validateIdInURLParam, controller.getInviteeById.bind(controller));
    router.post('/:event_id', authMiddleware, controller.createInvitee.bind(controller));
    router.put('/:id', authMiddleware, validateIdInURLParam, controller.updateInvitee.bind(controller));
    router.delete('/:id', authMiddleware, validateIdInURLParam, controller.deleteInvitee.bind(controller));
    router.get('/:event_id/invitee', authMiddleware, controller.getInviteesByEventId.bind(controller));
    router.get('/:event_id/status', authMiddleware, controller.countInviteeStatusByEventId.bind(controller));
    router.patch('/checkin/:event_id/:user_id', authMiddleware, controller.checkin.bind(controller));
    router.patch('/checkout/:event_id/:user_id', authMiddleware, controller.checkout.bind(controller));

    return router;
}