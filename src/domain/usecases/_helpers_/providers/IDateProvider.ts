import { CompareDateDTO } from '@/domain/usecases/_helpers_/providers/dtos/CompareDateDTO';

interface IDateProvider {
  convertToUTC(date: Date): string;
  compareInHours(data: CompareDateDTO): number;
  dateNow(): Date;
  compareInDays(data: CompareDateDTO): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(data: CompareDateDTO): boolean;
}

export { IDateProvider };
