import {sendTransaction} from '../../src/services/transaction.service'; // Import the createUser function
import * as userRepository from '../../src/repositories/user.repository';
import * as transactionRepository from '../../src/repositories/transaction.repository';
import {randomUUID} from 'crypto';

jest.mock('../../src/repositories/user.repository');
jest.mock('../../src/repositories/transaction.repository');

const findByIdOrUsernameMock = jest.spyOn(
  userRepository,
  'findUserByIdOrUsername'
);
const saveTransactionMock = jest.spyOn(
  transactionRepository,
  'saveTransaction'
);

describe('transaction.service', () => {
  it("throws an error if 'from' account and 'to' account are same", async () => {
    await expect(
      sendTransaction({from: 'fromUser', to: 'fromUser', amount: 1000})
    ).rejects.toThrowError(
      "'from' acount and 'to' account cannot be the same."
    );
  });

  it("throws an error if 'from' account does not exist", async () => {
    findByIdOrUsernameMock.mockImplementationOnce(() => null);

    await expect(
      sendTransaction({from: 'fromUser', to: 'toUser', amount: 1000})
    ).rejects.toThrowError("'from' account does not exist.");
  });

  it("throws an error if 'to' account does not exist.", async () => {
    findByIdOrUsernameMock.mockResolvedValueOnce({
      _id: 'fromUserId',
      username: 'fromUsername',
      balance: '1000',
    });
    findByIdOrUsernameMock.mockImplementationOnce(() => null);

    await expect(
      sendTransaction({
        from: 'fromUsername',
        to: 'toUser',
        amount: BigInt(1000),
      })
    ).rejects.toThrowError("'to' account does not exist.");
  });

  it("throws an error if 'balance' of 'from' account is too low", async () => {
    findByIdOrUsernameMock.mockResolvedValueOnce({
      _id: 'fromUserId',
      username: 'fromUsername',
      balance: '1000',
    });
    findByIdOrUsernameMock.mockResolvedValueOnce({
      _id: 'toUserId',
      username: 'toUsername',
      balance: '1000',
    });

    await expect(
      sendTransaction({
        from: 'fromUsername',
        to: 'toUsername',
        amount: BigInt(10000),
      })
    ).rejects.toThrowError("Balance of 'from' account too low.");
  });

  it("throws an error if 'amount' is invalid", async () => {
    findByIdOrUsernameMock.mockResolvedValueOnce({
      _id: 'fromUserId',
      username: 'fromUsername',
      balance: '1000',
    });
    findByIdOrUsernameMock.mockResolvedValueOnce({
      _id: 'toUserId',
      username: 'toUsername',
      balance: '1000',
    });

    await expect(
      sendTransaction({
        from: 'fromUsername',
        to: 'toUsername',
        amount: BigInt(-100),
      })
    ).rejects.toThrowError('Invalid transaction amount.');
  });

  it('creates a new transaction with valid amount', async () => {
    findByIdOrUsernameMock.mockResolvedValueOnce({
      _id: 'fromUserId',
      username: 'fromUsername',
      balance: '1000',
    });
    findByIdOrUsernameMock.mockResolvedValueOnce({
      _id: 'toUserId',
      username: 'toUsername',
      balance: '1000',
    });

    saveTransactionMock.mockResolvedValueOnce({
      _id: randomUUID().toString(),
      from: 'fromUserId',
      to: 'toUserId',
      amount: '1000',
    });

    const result = await sendTransaction({
      from: 'fromUsername',
      to: 'toUsername',
      amount: BigInt(1000),
    });

    expect(result._id).toEqual(expect.any(String));
    expect(result.from).toEqual('fromUserId');
    expect(result.to).toEqual('toUserId');
    expect(result.amount).toEqual('1000');

    expect(userRepository.findUserByIdOrUsername).toHaveBeenCalledWith(
      'fromUsername'
    );
    expect(userRepository.findUserByIdOrUsername).toHaveBeenCalledWith(
      'toUsername'
    );

    expect(transactionRepository.saveTransaction).toHaveBeenCalledWith({
      _id: expect.any(String),
      from: 'fromUserId',
      to: 'toUserId',
      amount: '1000',
    });
  });
});
