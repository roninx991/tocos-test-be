import TransactionModel, { Transaction } from "../models/transaction.model";

export const saveTransaction = (transaction: Transaction): Promise<Transaction> => {
    return TransactionModel.create<Transaction>(transaction);
}

export const findAllTransactions = (): Promise<Array<Transaction>> => {
    return TransactionModel.find({});
}