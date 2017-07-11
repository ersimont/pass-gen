import { Component } from '@angular/core';
import {Generator} from "./generator";
import {copy} from "./browser-copy";

const NUM_NORMAL_KEYS = 4;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public iteree = Array(NUM_NORMAL_KEYS);
  public keys = Array(NUM_NORMAL_KEYS).fill("");
  public secret = "";
  public confirm = "";
  public length = 12;
  public letters = true;
  public numbers = true;
  public special = false;
  public show = false;

  public getMessage() {
    if (!this.isConfirmed()) {
      return "Bad secret key";
    } else if (this.show) {
      return this.getPassword();
    } else {
      return "Show password";
    }
  }

  public isConfirmed() {
    return this.confirm.length === 0 || this.confirm == this.secret;
  }

  public copy() {
    copy(this.getPassword());
    this.secret = "";
  }

  private getPassword() {
    if (this.length && (this.letters || this.numbers || this.special)) {
      return new Generator(
        this.letters, this.letters, this.numbers, this.special,
      ).generate(this.length, this.keys.concat(this.secret));
    } else {
      return "";
    }
  }
}
