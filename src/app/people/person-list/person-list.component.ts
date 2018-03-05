import { PersonService } from './../person.service';
import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import _ from 'lodash';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  people: Person[] = [];
  selected: Person;

  constructor(private service: PersonService) { }

  ngOnInit() {
    this.service.list().then((people: Person[]) => (this.people = people));

    this.service.onCreate.subscribe(person => {
      this.people.push(person as Person);
      this.clear();
    });

    this.service.onEdited.subscribe(person => {
      this.people.forEach((p, i) => {
        if (p._id === person._id) {
          this.people[i] = person;
        }
      });
      this.clear();
    });
  }

  select(person: Person) {
    this.selected = person;
  }

  clear() {
    this.selected = null;
  }

  edit() {
    this.service.onToEdit.emit(Object.assign({}, this.selected));
  }

  delt() {
    this.service.remove(this.selected)
      .then(response => {
        if (!response) {
          const index = this.people.indexOf(this.selected);
          this.people.splice(index, 1);
          this.clear();
        }
      });
  }
}
