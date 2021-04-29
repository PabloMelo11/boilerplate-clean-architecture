import { v4 as uuid } from 'uuid';

export abstract class Entity<T> {
  protected readonly id: string;

  public readonly props: T;

  constructor(props: T, id?: string) {
    this.id = id || uuid();
    this.props = props;
  }
}
