import { v4 as uuid } from 'uuid';

export abstract class Entity<T> {
  public readonly id: string;
  public readonly props: T;

  get _id(): string {
    return this.id;
  }

  constructor(props: T, id?: string) {
    this.id = id || uuid();
    this.props = props;
  }
}
