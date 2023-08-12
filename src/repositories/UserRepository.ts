import TransactionModel from "../models/TransactionModel";
import UserModel, { User } from "../models/UserModel"

export const saveUser = (user: User): Promise<User> => {
    return UserModel.create<User>(user);
}

export const updateBalance = (userId?: string, amount?: BigInt) => {
    return UserModel.findByIdAndUpdate(userId, { balance: amount });
}

export const findUserByIdOrUsername = (idOrUsername: string): Promise<User> | undefined => {
    let user = UserModel.findOne({
        $or: [
            { _id: idOrUsername },
            { username: idOrUsername }
        ]
    });
    return user as Promise<User>;
}

export const findAllUsers = (): Promise<Array<User>> => {
    return UserModel.find({});
}

export const findAllTransactions = (): Promise<Array<User>> => {
    return TransactionModel.find({});
}
