import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  provideValueAccessor,
  WrappedControlSuperclass,
} from '@s-libs/ng-core';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss',
  providers: [provideValueAccessor(KeyComponent)],
})
export class KeyComponent extends WrappedControlSuperclass<string> {
  @Input({ required: true }) label!: string;
  @Input() secret = false;

  protected control = new FormControl('', { nonNullable: true });
}