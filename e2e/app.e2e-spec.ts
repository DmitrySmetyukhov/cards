import { CardsPage } from './app.po';

describe('cards App', () => {
  let page: CardsPage;

  beforeEach(() => {
    page = new CardsPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
