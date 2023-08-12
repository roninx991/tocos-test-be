import { createUser } from '../src/services/UserService'; // Import the createUser function
import * as userRepository from '../src/repositories/UserRepository';

jest.mock('../src/repositories/UserRepository')

let findByIdOrUsernameMock = jest.spyOn(userRepository, 'findUserByIdOrUsername');
let saveUserMock = jest.spyOn(userRepository, 'saveUser');

describe('createUser', () => {

  it('throws an error if username already exists', async () => {
    
    findByIdOrUsernameMock.mockResolvedValueOnce({_id: 'newUserId', username: 'newUsername', balance: '100'});
    
    await expect(createUser('existingUsername')).rejects.toThrowError('Username already exists!');
  });

  it('throws an error for empty username', async () => {

    await expect(createUser('')).rejects.toThrowError('Username cannot be empty');
  });

  it('creates a new user with valid username', async () => {

    findByIdOrUsernameMock.mockImplementationOnce((username: string) => undefined);
    saveUserMock.mockResolvedValueOnce({_id: 'newUserId', username: 'newUsername', balance: '100'});

    const result = await createUser('newUsername');

    expect(result._id).toEqual('newUserId');
    expect(result.username).toEqual('newUsername');
    expect(result.balance).toEqual('100');

    expect(userRepository.findUserByIdOrUsername).toHaveBeenCalledWith('newUsername');
    expect(userRepository.saveUser).toHaveBeenCalledWith({
      _id: expect.any(String),
      username: 'newUsername',
      balance: expect.any(String),
    });
  });
});