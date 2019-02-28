import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { RadialMenuComponent } from './radial-menu/radial-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(RadialMenuComponent) menu;


  public title = 'radial-menu';

  // LIFE CYCLE
  constructor() { }

  ngOnInit(): void {
    console.log(this.menu);
  }

  ngAfterViewInit(): void {
    console.log(this.menu);

  }
  // LIFE CYCLE END

  // BUTTON HANDLING
  public showYesNoMenu(): void {
    if (this.menu) {
      this.menu.showYesNoMenu();
    }
  }

  public showPortfolioMenu(): void {
    if (this.menu) {
      this.menu.showPortfolioMenu();
    }
  }

  public showRandomMenu(itemCount = -1): void {
    if (this.menu) {
      this.menu.showRandomMenu();
    }
  }
  // BUTTON HANDLING END
}
