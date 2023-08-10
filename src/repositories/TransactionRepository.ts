import TransactionModel, { Transaction } from "../models/TransactionModel";

export const saveTransaction = (transaction: Transaction): Promise<Transaction> => {
    return TransactionModel.create<Transaction>(transaction);
}
