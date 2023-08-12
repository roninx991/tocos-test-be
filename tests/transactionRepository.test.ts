import { mongoose } from "@typegoose/typegoose";
import connect, { reset_db_client } from "../src/configurations/mongodb.connection";
import { MongoMemoryServer } from "mongodb-memory-server";
import { findAllTransactions, saveTransaction } from "../src/repositories/transaction.repository";

describe('userRepository', () => {
    let client: mongoose.Mongoose | null;
    let mongodb_server: MongoMemoryServer;

    beforeAll(async () => {
        mongodb_server = await MongoMemoryServer.create();
        client = await connect(mongodb_server.getUri());
    });

    it('should create a new transaction', async () => {
        let newTransaction = await saveTransaction({ _id: 'newTransactionId', from: 'fromUser', to: 'toUser', amount: '1000'});
        expect(newTransaction._id).toBe('newTransactionId');
        expect(newTransaction.from).toBe('fromUser');
        expect(newTransaction.to).toBe('toUser');
        expect(newTransaction.amount).toBe('1000');
    });

    it('should get all transactions', async () => {
        let transactions = await findAllTransactions();
        expect(transactions.length).toBe(1);
    });

    afterAll(async () => {
        await client?.connection.dropDatabase();
        await client?.connection.close();
        reset_db_client();
        mongodb_server.stop();
    });
});