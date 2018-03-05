import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { Person } from '../person';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  person: Person;
  message: string;
  toEdit = false;

  constructor(private service: PersonService) { }

  ngOnInit() {
    this.resetPerson();
    this.service.onToEdit.subscribe(person => {
      this.toEdit = true;
      this.person = person;
    });
  }

  edit() {
    this.service.update(this.person)
      .then(result => {
        if (typeof result === 'string') {
          return this.showMessage(String(result));
        }

        this.showMessage('Pessoa editada!');
        this.resetPerson();
      });
  }

  create() {
    this.service.create(this.person)
      .then(result => {
        if (typeof result === 'string') {
          return this.showMessage(String(result));
        }

        this.showMessage('Pessoa cadastrada!');
        this.resetPerson();
      });
  }

  private resetPerson() {
    this.person = { name: '', email: '', birth: '', phone: '' };
    this.toEdit = false;
  }

  private showMessage(msg: string) {
    this.message = msg;
    setTimeout(() => (this.message = ''), 3000);
  }

}
