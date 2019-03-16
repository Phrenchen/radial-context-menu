import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RadialMenuComponent } from './radial-menu/radial-menu.component';
import { ClickOutsideDetectorDirective } from './directives/click-detector.directive';
import { MouseMoverDirective } from './directives/mouse-mover.directive';
import { MenuMinimapComponent } from './menu-minimap/menu-minimap.component';
import { MenuItemDirective } from './directives/menu-item.directive';
import { MixcloudComponent } from './mixcloud/mixcloud.component';
import { MemoevoComponent } from './memoevo/memoevo.component';

@NgModule({
  declarations: [
    AppComponent,
    RadialMenuComponent,
    ClickOutsideDetectorDirective,
    MouseMoverDirective,
    MenuMinimapComponent,
    MenuItemDirective,
    MixcloudComponent,
    MemoevoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
