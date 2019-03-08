import { Injectable, OnInit } from '@angular/core';
import { MenuItemDirective } from 'src/app/directives/menu-item.directive';
import { MenuItem } from '../model/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuItems: Map<string, MenuItem> = new Map<string, MenuItem>();

  constructor() {
    this.init();
  }

  private init(): void {
    /** prepare data for menu items
     * IMPORTANT:
     * here we map DOM Element ids with data used by the menu
     * BE CAREFUL not to change id´s without updating here!
     * TODO: database?
     */

    const btnYesNoMenu = new MenuItem();
    btnYesNoMenu.id = 'show-yes-no-menu';
    btnYesNoMenu.title = 'show Yes / No dialog';
    btnYesNoMenu.description = 'Menu with two options';
    btnYesNoMenu.label = 'yes_no_label';
    btnYesNoMenu.height = 100;
    btnYesNoMenu.width = 100;
    this.menuItems.set(btnYesNoMenu.id, btnYesNoMenu);

    const btnRandomMenu = new MenuItem();
    btnRandomMenu.id = 'show-random-menu';
    btnRandomMenu.title = 'Random amount of items on circle';
    btnRandomMenu.description = 'try it :)';
    btnRandomMenu.label = 'random_label';
    btnRandomMenu.height = 100;
    btnRandomMenu.width = 100;
    this.menuItems.set(btnRandomMenu.id, btnRandomMenu);
  }

  /**
   * adds VO to the directive
   */
  public enhanceItem(item: MenuItemDirective): void {
    // console.log('enhance item');
    // console.log(item);
    // console.log();
    // console.log(this.menuItems);
    let menuItem: MenuItem;

    this.menuItems.forEach(candidate => {
      // console.log(candidate);
      if (candidate.id === item.id) {
        menuItem = candidate;
        return;
      }
    });

    if (menuItem) {
      console.log(menuItem);
      item.payload = menuItem;
    } else {
      // console.log('no data for item: ' + item.id);
    }
  }
}
