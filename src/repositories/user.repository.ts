import UserModel, {User} from '../models/user.model';

export const saveUser = async (user: User): Promise<User> => {
  return UserModel.create<User>(user);
};

export const updateBalance = (userId?: string, amount?: BigInt) => {
  return UserModel.findByIdAndUpdate(userId, {balance: amount});
};

export const findUserByIdOrUsername = (
  idOrUsername: string
): Promise<User> | null => {
  const user = UserModel.findOne({
    $or: [{_id: idOrUsername}, {username: idOrUsername}],
  });
  return user as Promise<User>;
};

export const findAllUsers = (): Promise<Array<User>> => {
  return UserModel.find({});
};
