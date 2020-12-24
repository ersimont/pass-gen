import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Generator, LETTERS } from './generator';

const NUM_NORMAL_KEYS = 4;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  iteree = Array(NUM_NORMAL_KEYS);
  keys = Array(NUM_NORMAL_KEYS).fill('');
  secret = '';
  confirm = '';
  length = 12;
  letters = true;
  numbers = true;
  special = false;
  show = false;

  @ViewChildren('input')
  set inputs(refs: QueryList<ElementRef>) {
    setTimeout(() => {
      refs.first.nativeElement.focus();
    });
  }

  getMessage(): string {
    if (!this.isConfirmed()) {
      return 'Bad secret key';
    } else if (this.show) {
      return this.getPassword();
    } else {
      return 'Show password';
    }
  }

  isConfirmed(): boolean {
    return this.confirm.length === 0 || this.confirm === this.secret;
  }

  copy(): void {
    navigator.clipboard.writeText(this.getPassword());
    this.secret = '';
    this.confirm = '';
  }

  private getPassword(): string {
    if (this.length && (this.letters || this.numbers || this.special)) {
      const generator = new Generator(
        this.letters,
        this.letters,
        this.numbers,
        this.special,
      );
      if (this.letters && this.numbers) {
        generator.addToFirst(LETTERS);
        generator.addToLast(LETTERS);
      }
      return generator.generate(this.length, this.keys.concat(this.secret));
    } else {
      return '';
    }
  }
}
