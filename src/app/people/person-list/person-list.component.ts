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
  loading: Boolean = false;

  constructor(private service: PersonService) { }

  /**
   * Pega a lista de pessoas do serviço, assina a criação e edição
   * para etualizar a lista de acordo com o novo elemento enviado ao
   * servidor
   */
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

  /**
   * Seleciona uma pessoa da tabela, para ter as ações sobre ela
   * @param person
   */
  select(person: Person) {
    if (!this.loading) {
      this.selected = person;
    }
  }

  /**
   * Limpa a pessoa selecionada atualmente, desfazendo a seleção da tabela
   */
  clear() {
    this.selected = null;
  }

  /**
   * Envia um sinal com uma cópia da pessoa seleciona para que o formulário
   * reveba a pessoa e tarte de edita-la
   */
  edit() {
    this.service.onToEdit.emit(Object.assign({}, this.selected));
  }

  /**
   * Chama o serviço para apagar uma pessoa, exibindo o retorno do mesmo
   */
  delt() {
    this.loading = true;
    this.service.remove(this.selected)
      .then(response => {
        if (!response) {
          const index = this.people.indexOf(this.selected);
          this.people.splice(index, 1);
          this.clear();
        }
        this.loading = false;
      });
  }
}
