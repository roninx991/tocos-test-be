import { randomUUID } from "crypto";
import { User } from "../models/UserModel";
import { findUserByIdOrUsername, saveUser } from "../repositories/UserRepository";

export const createUser = async (username: string) => {
    if (username == "" || username == null || username == undefined) {
        throw Error("Username cannot be empty");
    }
    
    let existingUser = await findUserByIdOrUsername(username);
    if (existingUser != undefined || existingUser != null) {
        throw Error("Username already exists!");
    }

    let user: User = {
        _id: randomUUID().toString(),
        username: username,
        balance: BigInt(100*10**18).toString()
    }
    return saveUser(user);
}
