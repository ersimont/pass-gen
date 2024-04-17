import { BaseHarnessFilters, HarnessPredicate } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { assert } from '@s-libs/js-core';
import { ComponentHarnessSuperclass } from '@s-libs/ng-dev';
import { matButtonHarnessWithIcon } from '@s-libs/ng-mat-core';

interface KeyComponentHarnessFilters extends BaseHarnessFilters {
  label?: string;
}

export class KeyComponentHarness extends ComponentHarnessSuperclass {
  static hostSelector = 'app-key';

  static with(
    options: KeyComponentHarnessFilters,
  ): HarnessPredicate<KeyComponentHarness> {
    return new HarnessPredicate(KeyComponentHarness, options).addOption(
      'label',
      options.label,
      async (harness, label) =>
        HarnessPredicate.stringMatches(harness.getLabel(), label),
    );
  }

  async getLabel(): Promise<string> {
    const input = await this.getHarness(MatFormFieldHarness);
    const label = await input.getLabel();
    assert(label, 'label is a required input');
    return label;
  }

  async getValue(): Promise<string> {
    const input = await this.#getInput();
    return input.getValue();
  }

  async setValue(value: string): Promise<void> {
    const input = await this.#getInput();
    await input.setValue(value);
  }

  async hasClearButton(): Promise<boolean> {
    const button = await this.#getClearButton();
    return !!button;
  }

  async clear(): Promise<void> {
    const button = await this.#getClearButton();
    assert(button, 'clear button is not showing');
    await button.click();
  }

  async #getClearButton(): Promise<MatButtonHarness | null> {
    return this.getHarnessOrNull(matButtonHarnessWithIcon({ name: 'clear' }));
  }

  async #getInput(): Promise<MatInputHarness> {
    return this.getHarness(MatInputHarness);
  }
}
