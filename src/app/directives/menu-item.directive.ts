import { Directive, Input, OnInit, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { MenuItem } from '../radial-menu/model/MenuItem';

@Directive({
  selector: '[appMenuItem]'
})
export class MenuItemDirective implements OnInit, AfterViewInit {

  @Input() payload: MenuItem;
  @Input() id: string;

  @Output() ping: EventEmitter<string> = new EventEmitter();


  constructor(el: ElementRef) {
    // console.log(el);
  }


  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    // console.log('1 this.payload: ' + this.payload);
    
    // app controller should be listening
    // this.ping.emit(this.payload);
  }
  
  ngAfterViewInit(): void {
    // console.log('2 this.payload: ' + this.payload);    // undefined?
    
  }
}
