import { Email } from '@/domain/entities/user/email';
import { Name } from '@/domain/entities/user/name';
import { Password } from '@/domain/entities/user/password';
import { User } from '@/domain/entities/user/user';

const name = Name.create('John Doe').value as Name;
const email = Email.create('johndoe@example.com').value as Email;
const password = Password.create('123456').value as Password;

describe('User entity', () => {
  it('should be able to create new user', () => {
    const userOrError = User.create({
      name: name.value,
      email: email.value,
      password: password.value,
      driver_license: 'ABC-123',
    });

    expect(userOrError.isRight()).toBeTruthy();
  });
});