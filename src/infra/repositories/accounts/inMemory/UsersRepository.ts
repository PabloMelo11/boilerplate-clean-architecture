import { IUserPropsDTO } from '@/entities/user/dtos/IUserPropsDTO';

import { IUUIDProvider } from '@/infra/providers/UUIDProvider/IUUIDProvider';

import { IUsersRepository } from '@/modules/accounts/repositories/IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private static users: IUserPropsDTO[] = [];

  public async create(data: IUserPropsDTO): Promise<void> {
    UsersRepositoryInMemory.users.push(data);
  }

  public async findByEmail(email: string): Promise<IUserPropsDTO> {
    return UsersRepositoryInMemory.users.find(user => user.email === email);
  }

  public async listAllUsers(
    except_current_user: string,
  ): Promise<IUserPropsDTO[]> {
    return UsersRepositoryInMemory.users;
  }
}

export { UsersRepositoryInMemory };
