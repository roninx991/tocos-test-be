import { randomUUID } from "crypto";
import { Transaction } from "../models/transaction.model";
import { saveTransaction } from "../repositories/transaction.repository";
import { findUserByIdOrUsername, updateBalance } from "../repositories/user.repository";
import logger from "../configurations/logger.configuration";

export const sendTransaction = async (body: any) => {
    try {

        if (body.from === body.to)
            throw Error("'from' acount and 'to' account cannot be the same.");

        let fromUser = await findUserByIdOrUsername(body.from);
        let toUser = await findUserByIdOrUsername(body.to);
    
        if (fromUser == undefined || fromUser == null) 
            throw Error("'from' account does not exist.");
        if (toUser == undefined || toUser == null) 
            throw Error("'to' account does not exist.");
        if (BigInt(fromUser.balance).valueOf() < BigInt(body.amount).valueOf()) 
            throw Error("Balance of 'from' account too low.");
        if (BigInt(body.amount).valueOf() <= 0)
            throw Error("Invalid transaction amount.");

        let transaction: Transaction = {
            _id: randomUUID().toString(),
            from: fromUser._id,
            to: toUser._id,
            amount: body.amount
        }
        
        await updateBalance(fromUser._id, BigInt(fromUser.balance).valueOf() - BigInt(transaction.amount).valueOf())
        await updateBalance(toUser._id, BigInt(toUser.balance).valueOf() + BigInt(transaction.amount).valueOf())
    
        return await saveTransaction(transaction);    
    } catch (err) {
        logger.error((err as Error).message);
        throw err;
    }
}
