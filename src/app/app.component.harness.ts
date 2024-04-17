import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { ComponentHarnessSuperclass } from '@s-libs/ng-dev';
import { AppContext } from '../spec-helpers/app-context';
import { KeyComponentHarness } from './key/key.component.harness';

export class AppComponentHarness extends ComponentHarnessSuperclass {
  static hostSelector = 'app-root';

  async setKey(number: number, value: string): Promise<void> {
    await this.#setKey(`Key ${number}`, value);
  }

  async setSecret(value: string): Promise<void> {
    await this.#setKey('Secret Key', value);
  }

  async setLength(length: number): Promise<void> {
    await this.#setInput('length', String(length));
  }

  async toggle(label: string): Promise<void> {
    const checkbox = await this.getHarness(MatCheckboxHarness.with({ label }));
    await checkbox.toggle();
  }

  async getPassword(): Promise<string> {
    const button = await this.getHarness(
      MatButtonHarness.with({ text: 'Copy' }),
    );
    await button.click();
    const call = AppContext.getCurrent().writeTextController.expectOne(
      () => true,
    );
    const password = call.callInfo.args[0];
    call.flush();
    return password;
  }

  async #setKey(label: string, value: string): Promise<void> {
    const key = await this.getHarness(KeyComponentHarness.with({ label }));
    await key.setValue(value);
  }

  async #setInput(label: string, value: string): Promise<void> {
    const input = await this.getHarness(
      MatInputHarness.with({ selector: `[name="${label}"]` }),
    );
    await input.setValue(value);
  }
}
