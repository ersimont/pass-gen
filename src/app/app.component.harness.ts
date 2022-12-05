import { ComponentHarnessSuperclass } from '@s-libs/ng-dev';
import { AppContext } from '../spec-helpers/app-context';
import { MatLegacyButtonHarness as MatButtonHarness } from '@angular/material/legacy-button/testing';
import { MatLegacyInputHarness as MatInputHarness } from '@angular/material/legacy-input/testing';
import { MatLegacyCheckboxHarness as MatCheckboxHarness } from '@angular/material/legacy-checkbox/testing';

export class AppComponentHarness extends ComponentHarnessSuperclass {
  static hostSelector = 'app-root';

  async setKey(number: number, value: string): Promise<void> {
    await this.#setInput(`Key ${number}`, value);
  }

  async setSecret(value: string): Promise<void> {
    await this.#setInput('Secret Key', value);
  }

  async setLength(length: number): Promise<void> {
    await this.#setInput('Length', String(length));
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
    let password = call.callInfo.args[0];
    call.flush();
    return password;
  }

  async #setInput(placeholder: string, value: string): Promise<void> {
    const key = await this.getHarness(MatInputHarness.with({ placeholder }));
    await key.setValue(value);
  }
}
