import { ComponentHarnessSuperclass } from '@s-libs/ng-dev';
import { AppContext } from '../spec-helpers/app-context';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';

export class AppComponentHarness extends ComponentHarnessSuperclass {
  static hostSelector = 'app-root';

  async setKey(number: number, value: string): Promise<void> {
    await this.#setInput(`key${number - 1}`, value);
  }

  async setSecret(value: string): Promise<void> {
    await this.#setInput('secret', value);
  }

  async setLength(length: number): Promise<void> {
    await this.#setInput('length', String(length));
  }

  async toggle(label: string): Promise<void> {
    const checkbox = await this.getHarness(MatCheckboxHarness.with({ label }));
    await checkbox.toggle();
  }

  async getPassword(): Promise<string> {
    const button = await this.getHarness(MatButtonHarness);
    await button.click();
    const call = AppContext.getCurrent().writeTextController.expectOne(
      () => true,
    );
    const password = call.callInfo.args[0];
    call.flush();
    return password;
  }

  async #setInput(name: string, value: string): Promise<void> {
    const key = await this.getHarness(
      MatInputHarness.with({ selector: `[name="${name}"]` }),
    );
    await key.setValue(value);
  }
}
