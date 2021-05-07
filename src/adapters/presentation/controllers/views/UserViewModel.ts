import { User } from '@/entities/user/user';

class UserViewModel {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;

  static map(entity: User): UserViewModel {
    return {
      id: entity.id,
      name: entity.name.value,
      email: entity.email.value,
      driver_license: entity.driver_license,
      avatar: entity.avatar ?? null,
    };
  }

  static mapCollection(entities: UserViewModel[]): UserViewModel[] {
    return entities.map(entity => ({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      driver_license: entity.driver_license,
      avatar: entity.avatar ?? null,
    }));
  }
}

export { UserViewModel };
