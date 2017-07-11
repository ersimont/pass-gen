import { PwGenPage } from './app.po';

describe('pw-gen App', () => {
  let page: PwGenPage;

  beforeEach(() => {
    page = new PwGenPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
