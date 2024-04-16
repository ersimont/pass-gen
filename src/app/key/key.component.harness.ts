import { ComponentHarnessSuperclass } from '@s-libs/ng-dev';
import { MatInputHarness } from '@angular/material/input/testing';
import { BaseHarnessFilters, HarnessPredicate } from '@angular/cdk/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { assert } from '@s-libs/js-core';

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

  async setValue(value: string): Promise<void> {
    const input = await this.#getInput();
    await input.setValue(value);
  }

  async #getInput(): Promise<MatInputHarness> {
    return this.getHarness(MatInputHarness);
  }
}
