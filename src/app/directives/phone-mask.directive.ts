import { Directive, ElementRef, Renderer } from '@angular/core';
import VMasker from 'vanilla-masker';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {
  public el: HTMLInputElement;

  /**
   * Captura o elemento e usa o masker do vanilla para definir uma máscara
   * @param element
   * @param render
   */
  constructor(public element: ElementRef, public render: Renderer) {
    this.el = this.element.nativeElement;

    this.render.listen(this.el, 'keyup', () => VMasker(this.el).maskPattern('99 9999-99999'));
  }
}
