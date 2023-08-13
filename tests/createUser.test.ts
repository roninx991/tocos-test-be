import * as userRepository from '../src/repositories/user.repository';
import {createUser} from '../src/services/user.service';

jest.mock('../src/repositories/user.repository');

const findByIdOrUsernameMock = jest.spyOn(
  userRepository,
  'findUserByIdOrUsername'
);
const saveUserMock = jest.spyOn(userRepository, 'saveUser');

describe('createUser', () => {
  it('throws an error if username already exists', async () => {
    findByIdOrUsernameMock.mockResolvedValueOnce({
      _id: 'newUserId',
      username: 'newUsername',
      balance: '100',
    });

    await expect(createUser('existingUsername')).rejects.toThrowError(
      'Username already exists!'
    );
  });

  it('throws an error for empty username', async () => {
    await expect(createUser('')).rejects.toThrowError(
      'Username cannot be empty'
    );
  });

  it('creates a new user with valid username', async () => {
    findByIdOrUsernameMock.mockImplementationOnce(() => null);
    saveUserMock.mockResolvedValueOnce({
      _id: 'newUserId',
      username: 'newUsername',
      balance: '100',
    });

    const result = await createUser('newUsername');

    expect(result._id).toEqual('newUserId');
    expect(result.username).toEqual('newUsername');
    expect(result.balance).toEqual('100');

    expect(userRepository.findUserByIdOrUsername).toHaveBeenCalledWith(
      'newUsername'
    );
    expect(userRepository.saveUser).toHaveBeenCalledWith({
      _id: expect.any(String),
      username: 'newUsername',
      balance: expect.any(String),
    });
  });
});
