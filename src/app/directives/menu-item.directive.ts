import { Directive,
  Input,
  OnInit,
  ElementRef,
  AfterViewInit } from '@angular/core';

/**
 * - used to collect statically used HTMLElements for the menu. 
 * - MenuService must have data for them or they will be ignored
 */
@Directive({
  selector: '[appMenuItem]'
})
export class MenuItemDirective implements OnInit, AfterViewInit {

  @Input() id: string;

  constructor(el: ElementRef) {
    // console.log(el);
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
