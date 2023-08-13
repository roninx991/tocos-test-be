import express from 'express';
import {
  createUserController,
  getAllUsersController,
  getUserByIdOrUsernameController,
} from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/', createUserController);

userRouter.get('/', getAllUsersController);

userRouter.get('/:id', getUserByIdOrUsernameController);

export default userRouter;
