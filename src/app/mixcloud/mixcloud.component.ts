import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '../radial-menu/model/MenuItem';

@Component({
  selector: 'app-mixcloud',
  templateUrl: './mixcloud.component.html',
  styleUrls: ['./mixcloud.component.css']
})
export class MixcloudComponent implements OnInit {

  @Input() cloudcasts: Array<MenuItem> = new Array<MenuItem>();

  constructor() { }

  ngOnInit() {
  }

}
