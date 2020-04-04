import { BigInteger } from 'big-integer';

export class PasswordInProgress {
  public password = '';

  constructor(private hash: BigInteger) {}

  public insertFrom(universe: string, position = this.password.length) {
    this.password = stringInsert(
      this.password,
      position,
      universe[this.takeInt(universe.length)],
    );
  }

  public takeInt(maxPlusOne: number) {
    const int = this.hash.mod(maxPlusOne).toJSNumber();
    this.hash = this.hash.divide(maxPlusOne);
    return int;
  }
}

function stringInsert(string: string, position: number, toInsert: string) {
  return string.slice(0, position) + toInsert + string.slice(position);
}
