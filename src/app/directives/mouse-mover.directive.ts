import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appMouseMover]'
})
export class MouseMoverDirective {
  @Output() mouseMoved = new EventEmitter<MouseEvent>();

  constructor() { }


  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    this.mouseMoved.emit(event);
  }
}
