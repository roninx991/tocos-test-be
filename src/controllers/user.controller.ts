import {Request, Response} from 'express';
import {logger} from '@typegoose/typegoose/lib/logSettings';
import {
  findUserByIdOrUsername,
  findAllUsers,
} from '../repositories/user.repository';
import {createUser} from '../services/user.service';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const newUser = await createUser(req.body.username);
    res.json(newUser);
  } catch (err) {
    logger.error((err as Error).message);
    res.statusCode = 400;
    res.json({message: (err as Error).message});
  }
};

export const getUserByIdOrUsernameController = async (
  req: Request,
  res: Response
) => {
  const user = await findUserByIdOrUsername(req.params.id);
  if (user === undefined || user === null) {
    res.statusCode = 404;
    res.json({
      message: `User with username or id ${req.params.id} does not exist`,
    });
  } else {
    res.json(user);
  }
};

export const getAllUsersController = async (_: Request, res: Response) => {
  const users = await findAllUsers();
  res.json(users);
};
