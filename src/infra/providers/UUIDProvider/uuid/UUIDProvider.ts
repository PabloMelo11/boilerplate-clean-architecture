import { v4 as uuid } from 'uuid';

import { IUUIDProvider } from '@/domain/usecases/_helpers_/providers/IUUIDProvider';

class UUIDProvider implements IUUIDProvider {
  generateUUID(): string {
    return uuid();
  }
}

export { UUIDProvider };
