import { v4 as uuid } from 'uuid';

import { IUUIDProvider } from '../../IUUIDProvider';

class UUIDProviderInMemory implements IUUIDProvider {
  generateUUID(): string {
    return uuid();
  }
}

export { UUIDProviderInMemory };
