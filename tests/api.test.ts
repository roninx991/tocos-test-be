import {mongoose} from '@typegoose/typegoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import connect, {
  reset_db_client,
} from '../src/configurations/mongodb.connection';
import * as request from 'supertest';
import app from '../src/';
import dotenv from 'dotenv';

dotenv.config();

describe('/api/', () => {
  let client: mongoose.Mongoose | null;
  let mongodb_server: MongoMemoryServer;
  const old_env = process.env;

  beforeAll(async () => {
    mongodb_server = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongodb_server.getUri();
    process.env.PORT = '3001';
    client = await connect();
  });

  it('should create a new user', async () => {
    const res = await request
      .agent(app)
      .post('/api/users/')
      .send({username: 'newFromUser'});
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('newFromUser');
    expect(res.body.balance).toBe(BigInt(100 * 10 ** 18).toString());
  });

  it('should respond with duplicate user error', async () => {
    const res = await request
      .agent(app)
      .post('/api/users/')
      .send({username: 'newFromUser'});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Username already exists!');
  });

  it('should respond with correct user', async () => {
    const res = await request.agent(app).get('/api/users/newFromUser');
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('newFromUser');
    expect(res.body.balance).toBe(BigInt(100 * 10 ** 18).toString());
  });

  it('should respond with user does not exist error', async () => {
    const res = await request.agent(app).get('/api/users/newToUser');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe(
      'User with username or id newToUser does not exist'
    );
  });

  it('should respond with all users', async () => {
    const res = await request.agent(app).get('/api/users/');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('should create a new transaction', async () => {
    const res_create_toUser = await request
      .agent(app)
      .post('/api/users/')
      .send({username: 'newToUser'});
    expect(res_create_toUser.statusCode).toBe(200);
    expect(res_create_toUser.body.username).toBe('newToUser');
    expect(res_create_toUser.body.balance).toBe(
      BigInt(100 * 10 ** 18).toString()
    );
    const res_new_transaction = await request
      .agent(app)
      .post('/api/transactions/')
      .send({
        from: 'newFromUser',
        to: 'newToUser',
        amount: 10000,
      });
    expect(res_new_transaction.statusCode).toBe(200);
    expect(res_new_transaction.body.from).toEqual(expect.any(String));
    expect(res_new_transaction.body.to).toEqual(expect.any(String));
    expect(res_new_transaction.body.amount).toBe('10000');
  });

  it('should respond with invalid transaction', async () => {
    const res_same_to_and_from_transaction = await request
      .agent(app)
      .post('/api/transactions/')
      .send({
        from: 'newFromUser',
        to: 'newFromUser',
        amount: 10000,
      });
    expect(res_same_to_and_from_transaction.statusCode).toBe(400);
    expect(res_same_to_and_from_transaction.body.message).toEqual(
      "'from' acount and 'to' account cannot be the same."
    );

    const res_invalid_from_transaction = await request
      .agent(app)
      .post('/api/transactions/')
      .send({
        from: 'fromUser',
        to: 'newToUser',
        amount: 10000,
      });
    expect(res_invalid_from_transaction.statusCode).toBe(400);
    expect(res_invalid_from_transaction.body.message).toEqual(
      "'from' account does not exist."
    );

    const res_invalid_to_transaction = await request
      .agent(app)
      .post('/api/transactions/')
      .send({
        from: 'newFromUser',
        to: 'toUser',
        amount: 10000,
      });
    expect(res_invalid_to_transaction.statusCode).toBe(400);
    expect(res_invalid_to_transaction.body.message).toEqual(
      "'to' account does not exist."
    );

    const res_invalid_amount_transaction = await request
      .agent(app)
      .post('/api/transactions/')
      .send({
        from: 'newFromUser',
        to: 'newToUser',
        amount: -10000,
      });
    expect(res_invalid_amount_transaction.statusCode).toBe(400);
    expect(res_invalid_amount_transaction.body.message).toEqual(
      'Invalid transaction amount.'
    );

    const res_balance_low_amount_transaction = await request
      .agent(app)
      .post('/api/transactions/')
      .send({
        from: 'newFromUser',
        to: 'newToUser',
        amount: BigInt(200 * 10 ** 18).toString(),
      });

    expect(res_balance_low_amount_transaction.statusCode).toBe(400);
    expect(res_balance_low_amount_transaction.body.message).toEqual(
      "Balance of 'from' account too low."
    );
  });

  it('balances of the users should be updated after transaction', async () => {
    const res_get_fromUser = await request
      .agent(app)
      .get('/api/users/newFromUser');
    expect(res_get_fromUser.statusCode).toBe(200);
    expect(res_get_fromUser.body.username).toEqual('newFromUser');
    expect(res_get_fromUser.body.balance).toEqual(
      (BigInt(100 * 10 ** 18) - BigInt(10000)).toString()
    );

    const res_get_toUser = await request.agent(app).get('/api/users/newToUser');
    expect(res_get_toUser.statusCode).toBe(200);
    expect(res_get_toUser.body.username).toEqual('newToUser');
    expect(res_get_toUser.body.balance).toEqual(
      (BigInt(100 * 10 ** 18) + BigInt(10000)).toString()
    );
  });

  it('should respond with all transactions', async () => {
    const res = await request.agent(app).get('/api/transactions/');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  afterAll(async () => {
    await client?.connection.dropDatabase();
    await client?.connection.close();
    reset_db_client();
    mongodb_server.stop();
    process.env = old_env;
  });
});
