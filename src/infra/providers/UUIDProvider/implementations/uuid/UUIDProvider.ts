import { v4 as uuid } from 'uuid';

import { IUUIDProvider } from '../../IUUIDProvider';

class UUIDProvider implements IUUIDProvider {
  generateUUID(): string {
    return uuid();
  }
}

export { UUIDProvider };
