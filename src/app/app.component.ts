import { Component, ViewChild, OnInit, AfterViewInit, ViewChildren, OnChanges, SimpleChanges } from '@angular/core';
import { RadialMenuComponent } from './radial-menu/radial-menu.component';
import { MenuItem } from './radial-menu/model/MenuItem';
import { MenuItemDirective } from './directives/menu-item.directive';
import { MenuService } from './radial-menu/services/menu.service';
import { MixcloudService } from './services/mixcloud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnChanges {
  

  @ViewChild(RadialMenuComponent) menu: RadialMenuComponent;
  @ViewChildren(MenuItemDirective) menuItemDirectives: Array<MenuItemDirective>;

  public title = 'radial-menu';

  public targetIndex = -1;
  public cloudcasts: Array<MenuItem> = new Array<MenuItem>();
  /**
   * - animation frame handling
   * - FPS
   * - 'game loop' continiously called every render-cycle
   */
  private frameCount = 0;
  private fps = 60;
  private fpsInterval = 1;
  private now = 0;
  private last = 0;
  private elapsed = 0;

  private unselectedMenuHideDelayInFps = 3;   // 3 at 1 fps => 3 seconds

  //  -----

  // LIFE CYCLE
  constructor(private menuService: MenuService,
              private mixcloudService: MixcloudService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.getCloudcasts();

    // console.log(this.menuItemDirectives);

    this.updateMenuItems();
    
    this.startAnimationFrames();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
  //   this.updateMenuItems();
  //   // throw new Error('Method not implemented.');
  }
  // LIFE CYCLE END

  private updateMenuItems(): void {
    this.menuItemDirectives.forEach(item => {
      const menuItem: MenuItem = this.menuService.enhanceItem(item);

      if (menuItem) {
        console.log('enhanced item: ');
        console.log(menuItem);
        this.menuService.addItem(menuItem);
      }
    });
  }


  /**
   * ------ MIXCLOUD --------
   * triggers MixcloudService to HTTP-GET cloudcasts via Mixcloud API
   * @method async getCloudcasts
   */
  private async getCloudcasts() {
    const limit = 9;  // 0 : get all
    const cloudcastBlob = await this.mixcloudService.getCloudcasts(limit);


    try {
      this.cloudcasts = this.mixcloudService.parseCloudcast(cloudcastBlob);

      this.cloudcasts.forEach(cloudcast => {
        this.menuService.addItem(cloudcast);
      });

    } catch (e) {
      console.log('failed assigning response to news array');
    }
  }

  // ------ MIXCLOUD -------- end

  /**
   * - animation frame handling
   * - FPS
   * - 'game loop' continiously called every render-cycle
   */
  private startAnimationFrames(): void {
    this.fpsInterval = 1000 / this.fps;
    this.last = Date.now();

    this.animateFrame();
  }

  // may be called more often than fps
  // need fps cap for smooth animations
  private animateFrame(): void {
    // request next frame. wrap in arrow function to avoid this-binding-messups
    requestAnimationFrame(() => {
      this.animateFrame();
    });

    this.now = Date.now();
    this.elapsed = this.now - this.last;


    // TODO: check hiding of unselected menu with pointer up
    /**
     * - menu must emit event when switching pointerDown to false
     * - measure time since that event and hide menu (only if no selected item?)
     */

    // detect each frame. limited to manually set fps
    if (this.elapsed > this.fpsInterval) {
      this.last = this.now - (this.elapsed % this.fpsInterval);

      this.frameCount++;
      // console.log(this.frameCount);

      if (this.menu) {
        this.menu.update();
      }

    }

  }


  public getMenuItem(itemId: string): MenuItem {
    const menuItem: MenuItem = new MenuItem();

    switch (itemId) {
      case 'show-yes-no-menu':
        menuItem.title = 'Yes or No';
        menuItem.description = 'basic choice';
        break;
    }

    return menuItem;
  }

  public targetIndexUpdate(targetIndex: number): void {
    this.targetIndex = targetIndex;
  }

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
