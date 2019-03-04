import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-minimap',
  templateUrl: './menu-minimap.component.html',
  styleUrls: ['./menu-minimap.component.css']
})
export class MenuMinimapComponent implements OnInit {

  @Input() selectedTargetIndex = 1;

  constructor() { }

  ngOnInit() {
  }

  public get targetLabel(): string {
    return 'selected: ' + this.selectedTargetIndex.toString();
  }

}
