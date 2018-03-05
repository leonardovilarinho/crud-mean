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
  toEdit: Boolean = false;
  loading: Boolean = false;

  constructor(private service: PersonService) { }

  /**
   * Inicia uma pessoa em branco e assina o evento de ir
   * para edição, assim quando solicitar uma edição a pessoa do
   * formulário é alterada assim como o botão e método de submissão
   */
  ngOnInit() {
    this.resetPerson();
    this.service.onToEdit.subscribe(person => {
      this.toEdit = true;
      this.person = person;
    });
  }

  /**
   * Chama a edição de uma pessoa do serviço
   */
  edit() {
    this.loading = true;
    this.service.update(this.person)
      .then(result => this.handlerResult(result, 'Pessoa editada!'));
  }

  /**
   * Chama a criação de uma pessoa do serviço
   */
  create() {
    this.loading = true;
    this.service.create(this.person)
      .then(result => this.handlerResult(result, 'Pessoa criada!'));
  }

  /**
   * Manipula o resultado da criação ou edição, verificando se houve erro
   * retornado, se não exibindo a mensagem do segundo parâmetro
   * @param result
   * @param message
   */
  private handlerResult(result: String | Person, message: string) {
    if (typeof result === 'string') {
      return this.showMessage(String(result));
    }

    this.showMessage(message);
    this.resetPerson();
  }

  /**
   * Inicia uma nossa pessoa e desabilita a edição
   */
  private resetPerson() {
    this.person = { name: '', email: '', birth: '', phone: '' };
    this.toEdit = false;
  }

  /**
   * Mostra uma mensagem e remove-a da tela após um tempo
   * @param msg
   */
  private showMessage(msg: string) {
    this.loading = false;
    this.message = msg;
    setTimeout(() => (this.message = ''), 4000);
  }

}
