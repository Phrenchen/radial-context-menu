import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RadialMenuComponent } from './radial-menu/radial-menu.component';
import { ClickOutsideDetectorDirective } from './directives/click-detector.directive';
import { MouseMoverDirective } from './directives/mouse-mover.directive';
import { MenuItemComponent } from './radial-menu/menu-item/menu-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RadialMenuComponent,
    ClickOutsideDetectorDirective,
    MouseMoverDirective,
    MenuItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
