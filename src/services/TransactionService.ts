import { randomUUID } from "crypto";
import { Transaction } from "../models/TransactionModel";
import { saveTransaction } from "../repositories/TransactionRepository";
import { findUserByIdOrUsername, updateBalance } from "../repositories/UserRepository";
import logger from "../configurations/LoggerConfig";

export const sendTransaction = async (body: any) => {
    try {
        let transaction: Transaction = {
            _id: randomUUID().toString(),
            from: body.from,
            to: body.to,
            amount: body.amount
        }
    
        let fromUser = await findUserByIdOrUsername(transaction.from);
        let toUser = await findUserByIdOrUsername(transaction.to);
    
        if (fromUser == undefined || fromUser == null) 
            throw Error("'from' account does not exist.");
        if (toUser == undefined || toUser == null) 
            throw Error("'to' account does not exist.");
        if (BigInt(fromUser.balance).valueOf() < BigInt(transaction.amount).valueOf()) 
            throw Error("Balance of 'from' account too low.");
        if (BigInt(transaction.amount).valueOf() <= 0)
            throw Error("Invalid transaction amount");
    
        await updateBalance(fromUser._id, BigInt(fromUser.balance).valueOf() - BigInt(transaction.amount).valueOf())
        await updateBalance(toUser._id, BigInt(toUser.balance).valueOf() + BigInt(transaction.amount).valueOf())
    
        return await saveTransaction(transaction);    
    } catch (err) {
        logger.error((err as Error).message);
        throw err;
    }
}