import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Person } from './person';
import _ from 'lodash';

@Injectable()
export class PersonService {
  private route = 'http://localhost:3000/api/people';

  onCreate = new EventEmitter<Person>();
  onToEdit = new EventEmitter<Person>();
  onEdited = new EventEmitter<Person>();

  constructor(private http: Http) {}

  /**
   * Pega a lista de pessooas, retornando uma promise que pega
   * a lista do servidor ou uma lista em branco
   */
  list(): Promise<Array<String> | Person[]> {
    return this.http
      .get(this.route)
      .toPromise()
      .then(response => {
        const people = _.map(response.json().people, p => {
          p.birth = p.birth.split('T')[0];
          return p;
        });
        return people || [] as Person[];
      })
      .catch(this.error);
  }

  /**
   * Envia a pessoa recebida como parâmetro, pega uma nova pessoa ou
   * a pessoa retornada da api
   * @param person
   */
  create(person: Person): Promise<String | Person> {
    return this.http
      .post(this.route, person)
      .toPromise()
      .then(response => {
        const data = response.json();
        if (data.error) {
          return this.error(data.error);
        }

        data.person = this.getPerson(data.person);
        data.person.birth = data.person.birth.split('T')[0];
        this.onCreate.emit(data.person);

        return data.person;
      })
      .catch(this.error);
  }

  update(person: Person): Promise<String | Person> {
    return this.http
      .put(`${this.route}/${person._id}`, person)
      .toPromise()
      .then(response => {
        const data = response.json();
        if (data.error) {
          return this.error(data.error);
        }

        data.person = this.getPerson(data.person);
        data.person.birth = data.person.birth.split('T')[0];
        this.onEdited.emit(data.person);

        return data.person;
      })
      .catch(this.error);
  }

  remove(person: Person): Promise<String | Person> {
    return this.http
      .delete(`${this.route}/${person._id}`)
      .toPromise()
      .then(response => response.json().error)
      .catch(this.error);
  }

  private getPerson(person: any) {
    return person ? (person as Person) : null;
  }

  /**
   * Valida e pega uma mensagem de erro
   * @param error
   */
  private error(error: any) {
    const message = Array.isArray(error) ? error[0] : error;
    return message;
  }
}
