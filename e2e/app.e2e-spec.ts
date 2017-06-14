import { WgiPage } from './app.po';

describe('wgi App', function() {
  let page: WgiPage;

  beforeEach(() => {
    page = new WgiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
