import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Generator, LETTERS } from './generator';
import { KeyComponent } from './key/key.component';

const NUM_NORMAL_KEYS = 4;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    KeyComponent,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    NgForOf,
  ],
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

  getMessage(): string {
    if (!this.isConfirmed()) {
      return 'Bad secret key';
    } else if (this.show) {
      return this.#getPassword();
    } else {
      return 'Show password';
    }
  }

  isConfirmed(): boolean {
    return this.confirm.length === 0 || this.confirm === this.secret;
  }

  copy(): void {
    navigator.clipboard.writeText(this.#getPassword());
    this.secret = '';
    this.confirm = '';
  }

  #getPassword(): string {
    if (!this.#shouldGen()) {
      return '';
    }

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
  }

  #shouldGen(): boolean {
    return this.length > 0 && (this.letters || this.numbers || this.special);
  }
}
