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

  public targetIndex = -1;
  
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
  
  // TODO: pass to menu
  // public targetIds: Array<string> = ['show-yes-no-menu', 'show-random-menu', '', '', '', ];

  public get targetIds(): Array<string> {
    console.log('get target ids');
    return ['show-yes-no-menu', 'show-random-menu', '', '', '', ];
  }

  //  -----

  // LIFE CYCLE
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startAnimationFrames();
  }
  // LIFE CYCLE END

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
