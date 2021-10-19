import { Router } from 'express';
import { AuthenticateUserController } from './controller/AuthenticateUserController';

export const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle)