import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Point } from './model/Point';
import { RadialMenuHelper } from './RadialMenuHelper';
import { InputManager } from './input/InputManager';
import { InputState } from './input/model/InputState';


/**
 * Radial Men contains multiple action buttons positioned on a circle.
 *  depending on the current selected item a matching set of actions is available to the user.
 *  "enhanced Items 'offer' possible actions.
 *  They can be "deletable" or contain a details view which can be opened by the "open details" action
 */

@Component({
  selector: 'app-radial-menu',
  templateUrl: './radial-menu.component.html',
  styleUrls: ['./radial-menu.component.css']
})
export class RadialMenuComponent implements OnInit, AfterViewInit {

  @Input() origin: Point;
  @Output() selectedTargetIndex: EventEmitter<number> = new EventEmitter();

  // public isPointerDown = false;

  public get isPointerDown(): boolean {
    return this.inputManager.isCurrentState(InputState.DOWN);
  }
  public menuItemLabels: string[];

  public targetIndex = -1;

  private menuItemCount = 0;

  private radiusUnit = 'px';
  private menuRadiusPx = 150;                             // unit depentds on radiusUnit value: 'px', 'vmin', ...
  private offsetAngle = 0;
  private cancelDistanceToOriginDistance = 50;           // Pixel

  // private pointerDownPosition: Point = new Point();
  // private pointerUpPosition: Point = new Point();
  // private currentPointerPosition: Point = new Point();

  private selectedItemColor = 'blue';
  private unselectedColor = 'black';
  private mouseDownMarkerColor = this.unselectedColor;
  private activeCircleBackgroundColor = 'darkred';

  private inputManager: InputManager = new InputManager('content-wrapper');

  // LIFE CYCLE
  constructor() {
    this.showRandomMenu();
  }

  ngOnInit() { }

  ngAfterViewInit(): void { }
  // LIFE CYCLE END

  // MENU CREATORS
  public showYesNoMenu(): void {
    this.menuItemLabels = ['yes', 'no'];
    this.initMenuConfiguration();
  }

  public showPortfolioMenu(): void {
    this.menuItemLabels = ['home', 'about', 'work', 'contact'];
    this.initMenuConfiguration();
  }

  public showRandomMenu(itemCount = -1): void {
    this.menuItemLabels = [];

    // let itemCount = 4;
    const minItemCount = 2;
    const maxItemCount = 30 - minItemCount;

    if (itemCount === -1) {
      itemCount = Math.floor(Math.random() * maxItemCount + minItemCount);
    }

    // let random: number;
    let label: string;
    for (let i = 0; i < itemCount; i++) {
      // random = Math.random() * 1000;
      // random = i;
      // label = random.toString().substr(0, 2);
      label = i.toString();
      this.menuItemLabels.push(label);
    }

    this.initMenuConfiguration();
  }
  private initMenuConfiguration(): void {
    if (!this.menuItemLabels) {
      return;
    }
    this.menuItemCount = this.menuItemLabels.length;
    this.offsetAngle = 360 / this.menuItemCount;
    // this.menuRadiusPx = ;

    this.targetIndex = -1;
    // this.isPointerDown = false;
    this.inputManager.state = InputState.UP;
    this.inputManager.downPosition.reset();
    // this.pointerDownPosition.reset();

    // this.updateItemSelection();
  }
  // MENU CREATORS END

  // STYLING VIEW
  public getMenuItemStyle(index: number): string {
    const radius = index >= 0 ? this.menuRadiusPx : 1;
    index = index >= 0 ? index : 0;
    const rotateAngle = RadialMenuHelper.calculateAngleToItemOnCircle(index, this.offsetAngle);

    const styleStr = 'rotate(' + rotateAngle + 'deg) translate(0, -' + radius + this.radiusUnit + ') rotate(-' + rotateAngle + 'deg)';
    return styleStr;
  }


  // TODO: move to static helper method
  private getActiveSectorStyle(): string {
    // DOM query
    const activeCircleSector = document.querySelector('.active-circle-sector') as HTMLElement;

    if (!activeCircleSector) {
      return;
    }

    activeCircleSector.style.opacity = this.hasTarget ? '1' : '0';

    if (this.isPointerDown) {
      if (this.hasTarget) {
        const angleToTarget = RadialMenuHelper.calculateAngleToItemOnCircle(Math.max(0, this.targetIndex), this.offsetAngle);
        const startAngle = (angleToTarget + 90 - this.offsetAngle * .5);
        const endAngle = (angleToTarget + 90 + this.offsetAngle * .5);
        const backgroundColor = this.activeCircleBackgroundColor;
        const style = 'linear-gradient(' + endAngle + 'deg, transparent 50%, ' + backgroundColor + ' 50%), ' +
          'linear-gradient(' + startAngle + 'deg, ' + backgroundColor + ' 50%, transparent 50%)';

        activeCircleSector.style.backgroundImage = style;
        return style;
      }
    }
    return '';
  }

  private updateMarker(): void {
    // DOM query
    const mouseDownMarker = document.querySelector('.mouse-down-marker') as HTMLElement;
    const itemContainer = document.querySelector('.item-container') as HTMLElement;

    if (!mouseDownMarker) {
      return;
    }

    if (this.isPointerDown) {
      mouseDownMarker.style.color = this.mouseDownMarkerColor;
      mouseDownMarker.style.opacity = '1';
      itemContainer.style.opacity = '1';

      RadialMenuHelper.moveToPosition(mouseDownMarker, this.inputManager.downPosition);
      RadialMenuHelper.moveToPosition(itemContainer, this.inputManager.downPosition);
    } else {
      mouseDownMarker.style.opacity = '0';

      if (!this.hasTarget) {
        itemContainer.style.opacity = '0';
      }
    }
  }
  // STYLING VIEW END


  /**
   * method called once per update-frame (depends on app.fps) from app-component.
   */

  public update(): void {
    this.inputManager.update();
    this.updateMenu();
  }

  // PRIVATE

  /**
   * - called on pointer-move.
   * - updates selection
   */
  private updateMenu(): void {
    const oldTargetIndex = this.targetIndex;
    this.targetIndex = this.calculateTargetIndex();

    /**
     * - abort menu
     * - if current pointer is too close to the origin:
     *    - pointer-up closes the menu (hides it)
     *    - triggeres no action.
     *    - cancels selection
     */
    if (this.checkMenuCancel()) {
      this.hideMenu();
    }

    if (oldTargetIndex !== this.targetIndex) {
      this.selectedTargetIndex.emit(this.targetIndex);
    }

    // highlight selected DOM element
    // update active section
    this.getActiveSectorStyle();
    this.updateItemSelection();
    this.updateMarker();

  }

  private checkMenuCancel(): boolean {
    const distanceToOrigin: number = RadialMenuHelper.calculateDistance(this.inputManager.downPosition, this.inputManager.currentPosition);
    return distanceToOrigin < this.cancelDistanceToOriginDistance;
  }

  // unselect target
  private hideMenu(): void {
    this.targetIndex = -1;
  }

  private calculateTargetIndex(): number {
    // find position of nearest item on circle
    // item with smallest distance wins and will be selected on mouse up
    let angle: number;
    let position: Point;
    let distance: number;
    let minDistance = Number.MAX_VALUE;
    let candidateIndex: number;

    // for each item: calculate position on circle
    for (let i = 0; i < this.menuItemCount; i++) {
      angle = RadialMenuHelper.calculateAngleToItemOnCircle(i, this.offsetAngle);

      position = RadialMenuHelper.calculateCurrentPositionOnCircle(this.inputManager.downPosition,
        this.inputManager.currentPosition,
        this.menuRadiusPx,
        angle);

      // calculate distance to current position on circle
      distance = RadialMenuHelper.calculateDistance(this.inputManager.currentPosition, position);

      if (distance < minDistance) {
        candidateIndex = i;
        minDistance = distance;
      }
    }

    return candidateIndex;
  }

  // ITEM SELECTION
  private updateItemSelection(): void {
    const menuItems: NodeListOf<HTMLElement> = document.querySelectorAll('.menu-item') as NodeListOf<HTMLElement>;
    if (menuItems && menuItems.length >= this.targetIndex) {
      RadialMenuHelper.updateMenuItems(menuItems, this.targetIndex, this.selectedItemColor, this.unselectedColor);
    }
  }

  private get hasTarget(): boolean {
    return RadialMenuHelper.hasSelectedTarget(this.targetIndex);
  }
  // ITEM SELECTION END
}
