import { AppPage } from './app.po';

describe('crud-mean App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('create new people without name', () => {
    page.navigateTo();
    console.log('entrou')
    const message = page.createPeople({
      name: '',
      email: 'test@email.com',
      birth: '1999-11-11',
      phone: '34 1121-1212'
    })

    expect(message).toContain('nome')
    expect(message).toContain('obrigatório')
  });
});
