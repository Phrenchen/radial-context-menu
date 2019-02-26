import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutsideDetector]'
})
export class ClickOutsideDetectorDirective {

  @Output() clickElsewhere = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {}


  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    // Check if the click was outside the element
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      // console.log('clicked outside!');
      this.clickElsewhere.emit(event);
    }
  }
}
