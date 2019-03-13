import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MenuItem } from '../radial-menu/model/MenuItem';

@Component({
  selector: 'app-mixcloud',
  templateUrl: './mixcloud.component.html',
  styleUrls: ['./mixcloud.component.css']
})
export class MixcloudComponent implements OnInit, OnChanges {

  @Input() cloudcasts: Array<MenuItem> = new Array<MenuItem>();

  // LIFE CYCLE
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // console.log(this.cloudcasts);
  }

  // LIFE CYCLE END
}
