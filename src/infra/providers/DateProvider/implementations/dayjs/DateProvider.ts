import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

import { IDateProvider } from '@/usecases/_helpers_/providers/IDateProvider';

import { CompareDateDTO } from '@/infra/providers/DateProvider/dtos/CompareDateDTO';

class DateProviderDayjs implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours({ start_date, end_date }: CompareDateDTO): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(end_date_utc).diff(start_date_utc, 'hours');
  }

  dateNow() {
    return dayjs().toDate();
  }

  compareInDays({ start_date, end_date }: CompareDateDTO): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);

    return dayjs(end_date_utc).diff(start_date_utc, 'days');
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }

  compareIfBefore({ start_date, end_date }: CompareDateDTO): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
}

export { DateProviderDayjs };
