import { v4 as uuid } from 'uuid';

import { IUUIDProvider } from '@/usecases/_helpers_/providers/IUUIDProvider';

class UUIDProvider implements IUUIDProvider {
  generateUUID(): string {
    return uuid();
  }
}

export { UUIDProvider };
