import { browser, by, element } from 'protractor';
import { Person } from '../src/app/people/person';

export class AppPage {
  navigateTo() {
    console.log('entrando')
    return browser.get('/');
  }

  writeForm(person: Person) {
    element(by.name('name')).sendKeys(person.name)
    element(by.name('email')).sendKeys(person.email)
    element(by.name('birth')).sendKeys(person.birth)
    element(by.name('phone')).sendKeys(person.phone)
  }

  createPeople(person: Person) {
    this.writeForm(person)
    element(by.id('create-btn')).click()
    return element(by.id('message')).getText()
  }

}
