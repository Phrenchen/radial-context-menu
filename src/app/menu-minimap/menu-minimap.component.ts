import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RadialMenuHelper } from '../radial-menu/RadialMenuHelper';

@Component({
  selector: 'app-menu-minimap',
  templateUrl: './menu-minimap.component.html',
  styleUrls: ['./menu-minimap.component.css']
})
export class MenuMinimapComponent implements OnInit {

  @Input() selectedTargetIndex: number;

  constructor() { }

  ngOnInit() {}


  public get targetLabel(): string {
    return RadialMenuHelper.hasSelectedTarget(this.selectedTargetIndex) ?
      'selected: ' + this.selectedTargetIndex :
      'nothing selected';
  }

}
