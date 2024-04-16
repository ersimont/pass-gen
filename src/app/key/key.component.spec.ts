import { AppContext } from '../../spec-helpers/app-context';
import { KeyComponentHarness } from './key.component.harness';

describe('KeyComponent', () => {
  let ctx: AppContext;
  beforeEach(() => {
    ctx = new AppContext();
  });

  it('has a working clear button', () => {
    ctx.run(async () => {
      const key = await ctx.getHarness(KeyComponentHarness);
      await key.setValue('some value');

      await key.clear();

      expect(await key.getValue()).toBe('');
    });
  });
});
