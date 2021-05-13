import { hash, compare } from 'bcrypt';

import { IHashProvider } from '@/domain/usecases/_helpers_/providers/IHashProvider';

class HashProviderBCrypt implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { HashProviderBCrypt };
