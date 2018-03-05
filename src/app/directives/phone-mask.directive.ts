import { Directive, ElementRef, Renderer } from '@angular/core';
import VMasker from 'vanilla-masker';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {
  public el: HTMLInputElement;

  constructor(public element: ElementRef, public render: Renderer) {
    this.el = this.element.nativeElement;

    this.render.listen(this.el, 'keyup', () => VMasker(this.el).maskPattern('99 99999-9999'));
  }
}
