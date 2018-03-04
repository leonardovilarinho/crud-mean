import { PersonService } from './../person.service';
import { Component, OnInit } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  providers: [ PersonService ]
})
export class PersonListComponent implements OnInit {

  people: Person[]
  selected: Person

  constructor(private service: PersonService) { }

  ngOnInit() {
    this.service.list().then((people: Person[]) => (this.people = people))
  }

  select(person: Person) {
    this.selected = person
  }
}
