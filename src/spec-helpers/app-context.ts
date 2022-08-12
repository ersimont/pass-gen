import { AsyncMethodController, ComponentContext } from '@s-libs/ng-dev';
import { AppComponent } from '../app/app.component';
import { AppModule } from '../app/app.module';
import { assert } from '@s-libs/js-core';

export class AppContext extends ComponentContext<AppComponent> {
  static override getCurrent(): AppContext {
    const current = ComponentContext.getCurrent();
    assert(current instanceof AppContext);
    return current;
  }

  writeTextController = new AsyncMethodController(
    navigator.clipboard,
    'writeText',
  );

  constructor() {
    super(AppComponent, { imports: [AppModule] });
  }
}
