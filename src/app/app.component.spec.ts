import { AppContext } from '../spec-helpers/app-context';
import { AppComponentHarness } from './app.component.harness';

describe('AppComponent', () => {
  let ctx: AppContext;
  beforeEach(() => {
    ctx = new AppContext();
  });

  it('works for default settings', () => {
    ctx.run(async () => {
      const app = await ctx.getHarness(AppComponentHarness);
      await app.setKey(1, 'my First key_');
      await app.setKey(3, 'the THIRD!!');
      await app.setSecret("don't tell");

      expect(await app.getPassword()).toBe('K149iNuG8FxL');
    });
  });

  it('sets length', () => {
    ctx.run(async () => {
      const app = await ctx.getHarness(AppComponentHarness);
      await app.setKey(1, 'special length please');
      await app.setLength(5);

      expect(await app.getPassword()).toBe('de4NY');
    });
  });

  it('toggles letters', () => {
    ctx.run(async () => {
      const app = await ctx.getHarness(AppComponentHarness);
      await app.setKey(2, 'no letters?');
      await app.toggle('Include Letters');

      expect(await app.getPassword()).toBe('573408350582');
    });
  });

  it('toggles numbers', () => {
    ctx.run(async () => {
      const app = await ctx.getHarness(AppComponentHarness);
      await app.setKey(3, 'no numbers!');
      await app.toggle('Include Numbers');

      expect(await app.getPassword()).toBe('aKBhgILjcOMU');
    });
  });

  it('toggles special characters', () => {
    ctx.run(async () => {
      const app = await ctx.getHarness(AppComponentHarness);
      await app.setKey(4, "You think you're SO secure");
      await app.toggle('Include Special Characters');

      expect(await app.getPassword()).toBe('ffmR-;x3n>Ct');
    });
  });
});
