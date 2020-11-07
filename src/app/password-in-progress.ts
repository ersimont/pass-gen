import { BigInteger } from 'big-integer';

export class PasswordInProgress {
  password = '';

  constructor(private hash: BigInteger) {}

  insertFrom(universe: string, position = this.password.length): void {
    this.password = stringInsert(
      this.password,
      position,
      universe[this.takeInt(universe.length)],
    );
  }

  takeInt(maxPlusOne: number): number {
    const int = this.hash.mod(maxPlusOne).toJSNumber();
    this.hash = this.hash.divide(maxPlusOne);
    return int;
  }
}

function stringInsert(s: string, position: number, toInsert: string): string {
  return s.slice(0, position) + toInsert + s.slice(position);
}
