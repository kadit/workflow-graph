import { Directive, ElementRef, Renderer2, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appTypeahead]'
})
export class TypeaheadDirective{

  
  private names : string[] = [];
  constructor(public el: ElementRef, public renderer: Renderer2) {

    
  }

  @HostListener('keyup') onKeyUp($event) {
    // let val = event.currentTarget["value"];
    // const list = this.renderer.createElement('ul');
    // const listItem = this.renderer.createElement('li');
    // const text = this.renderer.createText('Hello world!');

    // this.renderer.appendChild(listItem, text);
    // this.renderer.appendChild(list, listItem);
    // this.renderer.appendChild(this.el.nativeElement, list);
    
    
    //We  need to style the element.
  }

}
