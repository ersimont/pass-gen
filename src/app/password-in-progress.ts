export class PasswordInProgress {
  password = '';

  constructor(private hash: bigint) {}

  insertFrom(universe: string, position = this.password.length): void {
    this.password = stringInsert(
      this.password,
      position,
      universe[this.takeInt(universe.length)],
    );
  }

  takeInt(maxPlusOne: number): number {
    const factor = BigInt(maxPlusOne);
    const int = Number(this.hash % factor);
    this.hash /= factor;
    return int;
  }
}

function stringInsert(s: string, position: number, toInsert: string): string {
  return s.slice(0, position) + toInsert + s.slice(position);
}
