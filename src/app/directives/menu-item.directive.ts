import { Directive, Input, OnInit, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MenuItem } from '../radial-menu/model/MenuItem';

@Directive({
  selector: '[appMenuItem]'
})
export class MenuItemDirective implements OnInit, AfterViewInit {

  @Input() id: string;


  constructor(el: ElementRef) {
    console.log(el);
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}
