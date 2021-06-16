import { IDateProvider } from '@/domain/usecases/_common_/providers/IDateProvider';

import { CompareDateDTO } from '@/domain/usecases/_common_/providers/dtos/CompareDateDTO';

class DateProviderInMemory implements IDateProvider {
  convertToUTC(date: Date): string {
    return new Date(date).toISOString();
  }

  compareInHours({ start_date, end_date }: CompareDateDTO): number {
    return Math.round(
      Math.abs(start_date.getTime() - end_date.getTime()) / 3600000,
    );
  }

  dateNow() {
    return new Date();
  }

  compareInDays({ start_date, end_date }: CompareDateDTO): number {
    return start_date.getTime() - end_date.getTime();
  }

  addDays(days: number): Date {
    const dateNow = new Date();

    const newDate = dateNow.setDate(dateNow.getDate() + days);

    return new Date(newDate);
  }

  addHours(hours: number): Date {
    const dateNow = new Date();

    const newDate = dateNow.setHours(dateNow.getHours() + hours);

    return new Date(newDate);
  }

  compareIfBefore({ start_date, end_date }: CompareDateDTO): boolean {
    let diffInDate = start_date.getTime() - end_date.getTime();
    diffInDate = diffInDate / (1000 * 60 * 60 * 24);

    if (diffInDate < 0) {
      return true;
    }

    return false;
  }
}

export { DateProviderInMemory };
