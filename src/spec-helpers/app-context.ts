import { assert } from '@s-libs/js-core';
import { AsyncMethodController, ComponentContext } from '@s-libs/ng-dev';
import { AppComponent } from '../app/app.component';
import { appConfig } from '../app/app.config';

export class AppContext extends ComponentContext<AppComponent> {
  writeTextController = new AsyncMethodController(
    navigator.clipboard,
    'writeText',
  );

  constructor() {
    super(AppComponent, appConfig);
  }

  static override getCurrent(): AppContext {
    const current = ComponentContext.getCurrent();
    assert(current instanceof AppContext);
    return current;
  }
}
