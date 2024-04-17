import { AppContext } from '../../spec-helpers/app-context';
import { KeyComponentHarness } from './key.component.harness';

describe('KeyComponent', () => {
  let ctx: AppContext;
  beforeEach(() => {
    ctx = new AppContext();
  });

  describe('clear button', () => {
    it('works', () => {
      ctx.run(async () => {
        const key = await ctx.getHarness(KeyComponentHarness);
        await key.setValue('some value');

        await key.clear();

        expect(await key.getValue()).toBe('');
      });
    });

    it('only appears when there is a value', () => {
      ctx.run(async () => {
        const key = await ctx.getHarness(KeyComponentHarness);
        expect(await key.hasClearButton()).toBe(false);

        await key.setValue('some value');
        expect(await key.hasClearButton()).toBe(true);

        await key.clear();
        expect(await key.hasClearButton()).toBe(false);
      });
    });
  });
});
