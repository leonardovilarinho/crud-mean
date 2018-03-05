import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Person } from './person';
import _ from 'lodash';

@Injectable()
export class PersonService {
  private route = '/api/people';

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
          p.birth = this.cropBirth(p);
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
      .then(response => this.receiveAndEmit(response.json(), this.onCreate))
      .catch(this.error);
  }

  /**
   * Envia o id da pessoa e os dados da esma para ser editada no banco,
   * em caso de falha o erro é retornado
   * @param person
   */
  update(person: Person): Promise<String | Person> {
    return this.http
      .put(`${this.route}/${person._id}`, person)
      .toPromise()
      .then(response => this.receiveAndEmit(response.json(), this.onEdited))
      .catch(this.error);
  }

  /**
   * Apaga a pessoa do bando de dados, a partir do seu id
   * @param person
   */
  remove(person: Person): Promise<String | Person> {
    return this.http
      .delete(`${this.route}/${person._id}`)
      .toPromise()
      .then(response => response.json().error)
      .catch(this.error);
  }

  /**
   * Corta a data de nascimento, retirando o horário que o servidor
   * entrega
   * @param person
   */
  private cropBirth(person: Person) {
    return person.birth.split('T')[0];
  }

  /**
   * Verifica e existencia de erro, pega a pessoa retornada do servidor
   * e a envia via evento
   * @param data
   * @param event
   */
  private receiveAndEmit(data: any, event: EventEmitter<Person>) {
    if (data.error) {
      return this.error(data.error);
    }

    data.person = this.getPerson(data.person);
    data.person.birth = this.cropBirth(data.person);
    event.emit(data.person);

    return data.person;
  }

  /**
   * Verifica se uma pessoa foi retornada do servidor, no caso
   * se não retorna nulo
   * @param person
   */
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
