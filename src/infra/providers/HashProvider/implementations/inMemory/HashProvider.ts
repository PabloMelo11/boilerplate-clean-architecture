import { IHashProvider } from '@/usecases/_helpers_/providers/IHashProvider';

class HashProviderInMemory implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export { HashProviderInMemory };
