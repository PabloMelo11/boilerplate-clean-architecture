import { SaveFileInStorageDTO } from '@/domain/usecases/_helpers_/providers/dtos/SaveFileInStorageDTO';

interface IStorageProvider {
  save(data: SaveFileInStorageDTO): Promise<string>;
  delete(data: SaveFileInStorageDTO): Promise<void>;
}

export { IStorageProvider };
