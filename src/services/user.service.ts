import {randomUUID} from 'crypto';
import {User} from '../models/user.model';
import {
  findUserByIdOrUsername,
  saveUser,
} from '../repositories/user.repository';

export const createUser = async (username: string) => {
  if (username === '' || username === null || username === undefined) {
    throw Error('Username cannot be empty');
  }

  const existingUser = await findUserByIdOrUsername(username);
  if (existingUser !== undefined && existingUser !== null) {
    throw Error('Username already exists!');
  }

  const user: User = {
    _id: randomUUID().toString(),
    username: username,
    balance: BigInt(100 * 10 ** 18).toString(),
  };
  return saveUser(user);
};
