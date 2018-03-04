import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import "rxjs/add/operator/toPromise"
import { Person } from './person'

@Injectable()
export class PersonService {
  private route: string = "http://localhost:3000/api/people"

  constructor(private http: Http) {}

  /**
   * Pega a lista de pessooas, retornando uma promise que pega
   * a lista do servidor ou uma lista em branco
   */
  list(): Promise<void | Person[]> {
    return this.http
      .get(this.route)
      .toPromise()
      .then(response => response.json().people || [] as Person[])
      .catch(this.error)
  }

  /**
   * Valida e pega uma mensagem de erro
   * @param error
   */
  private error(error: any) {
    const message = Array.isArray(error) ? error[0] : error
    console.error(message)
  }
}
