import {mongoose} from '@typegoose/typegoose';
import connect, {
  reset_db_client,
} from '../../src/configurations/mongodb.connection';
import {MongoMemoryServer} from 'mongodb-memory-server';
import {
  findAllUsers,
  findUserByIdOrUsername,
  saveUser,
  updateBalance,
} from '../../src/repositories/user.repository';

describe('user.repository', () => {
  let client: mongoose.Mongoose | null;
  let mongodb_server: MongoMemoryServer;

  beforeAll(async () => {
    mongodb_server = await MongoMemoryServer.create();
    client = await connect(mongodb_server.getUri());
  });

  it('should create a new user', async () => {
    const newUser = await saveUser({
      _id: 'newUserId',
      username: 'newUser',
      balance: '10000',
    });
    expect(newUser._id).toBe('newUserId');
    expect(newUser.username).toBe('newUser');
    expect(newUser.balance).toBe('10000');
  });

  it('should find a user by id', async () => {
    const user = await findUserByIdOrUsername('newUserId');
    expect(user?._id).toBe('newUserId');
    expect(user?.username).toBe('newUser');
    expect(user?.balance).toBe('10000');
  });

  it('should find a user by username', async () => {
    const user = await findUserByIdOrUsername('newUser');
    expect(user?._id).toBe('newUserId');
    expect(user?.username).toBe('newUser');
    expect(user?.balance).toBe('10000');
  });

  it('should find all users', async () => {
    const users = await findAllUsers();
    expect(users.length).toBe(1);
  });

  it('should update balance of a user', async () => {
    const user = await findUserByIdOrUsername('newUserId');
    expect(user?.balance).toBe('10000');

    await updateBalance('newUserId', BigInt(10).valueOf());
    const updatedUser = await findUserByIdOrUsername('newUserId');

    expect(updatedUser?.balance).toBe('10');
  });

  it('should return undefined if user does not exist', async () => {
    const user = await findUserByIdOrUsername('userId');
    expect(user).toBe(null);
  });

  afterAll(async () => {
    await client?.connection.dropDatabase();
    await client?.connection.close();
    reset_db_client();
    mongodb_server.stop();
  });
});
