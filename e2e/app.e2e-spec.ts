import { SpacecraftPage } from './app.po';

describe('spacecraft App', () => {
  let page: SpacecraftPage;

  beforeEach(() => {
    page = new SpacecraftPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
