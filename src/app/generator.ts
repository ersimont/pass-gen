import * as bigInt from "big-integer";
import {PasswordInProgress} from "./password-in-progress";

export const UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const LOWER_CASE = "abcdefghijklmnopqrstuvwxyz";
export const DIGITS = "0123456789";
export const LETTERS = UPPER_CASE + LOWER_CASE;
export const LETTERS_AND_DIGITS = LETTERS + DIGITS;
export const SPECIAL_CHARACTERS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

export class Generator {
  private defaultUniverse = "";
  private firstUniverse = "";
  private lastUniverse = "";
  private required: string[] = [];

  constructor(
    upperCase: boolean,
    lowerCase: boolean,
    digits: boolean,
    specialCharacters: boolean,
  ) {
    if (upperCase) {
      this.addToDefault(UPPER_CASE);
    }
    if (lowerCase) {
      this.addToDefault(LOWER_CASE);
    }
    if (digits) {
      this.addToDefault(DIGITS);
    }
    if (specialCharacters) {
      this.addToDefault(SPECIAL_CHARACTERS);
    }
  }

  // ////////////////////////////////////////////////////////////////////////
  // ///////////////////////////////////////////////////////// public methods

  /**
   * For each call to this method, at least one from the characters passed in
   * will be included in the password.
   */
  public addToDefault(characters: string) {
    this.defaultUniverse += characters;
    this.required.push(characters);
  }

  public addToFirst(characters: string) {
    this.firstUniverse += characters;
  }

  public addToLast(characters: string) {
    this.lastUniverse += characters;
  }

  public generate(length: number, keys: string[]) {
    const inProg = new PasswordInProgress(this.getHash(keys));
    if (this.firstUniverse.length > 0) {
      --length;
    }
    if (this.lastUniverse.length > 0) {
      --length;
    }
    for (let i = length - this.required.length; --i >= 0;) {
      inProg.insertFrom(this.defaultUniverse);
    }
    for (const universe of this.required) {
      inProg.insertFrom(universe, inProg.takeInt(inProg.password.length + 1));
    }
    if (this.firstUniverse.length > 0) {
      inProg.insertFrom(this.firstUniverse, 0);
    }
    if (this.lastUniverse.length > 0) {
      inProg.insertFrom(this.lastUniverse);
    }
    return inProg.password;
  }

  // ////////////////////////////////////////////////////////////////////////
  // //////////////////////////////////////////////////////// private methods

  private getHash(keys: string[]) {
    let hash = bigInt();
    let multiplier = this.defaultUniverse.length - 1;
    for (const key of keys) {
      for (let i = 0; i < key.length; ++i) {
        hash = hash.multiply(multiplier).add(key.codePointAt(i));
      }
    }
    return hash;
  }
}
