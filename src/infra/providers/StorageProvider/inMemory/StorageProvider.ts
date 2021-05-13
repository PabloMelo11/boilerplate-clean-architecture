import fs from 'fs';
import { resolve } from 'path';

import upload from '@/shared/config/upload';

import { IStorageProvider } from '@/domain/usecases/_helpers_/providers/IStorageProvider';

import { SaveFileInStorageDTO } from '@/domain/usecases/_helpers_/providers/dtos/SaveFileInStorageDTO';

class StorageProviderInMemory implements IStorageProvider {
  async save({ file, folder }: SaveFileInStorageDTO): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file),
      resolve(`${upload.tmpFolder}/${folder}`, file),
    );

    return file;
  }

  async delete({ file, folder }: SaveFileInStorageDTO): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }

    await fs.promises.unlink(filename);
  }
}

export { StorageProviderInMemory };
