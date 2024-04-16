import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  provideValueAccessor,
  WrappedControlSuperclass,
} from '@s-libs/ng-core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-key',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss',
  providers: [provideValueAccessor(KeyComponent)],
})
export class KeyComponent extends WrappedControlSuperclass<string> {
  @Input({ required: true }) label!: string;
  @Input() secret = false;

  protected control = new FormControl('', { nonNullable: true });
}
