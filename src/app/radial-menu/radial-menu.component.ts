import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Point } from './model/Point';
import { RadialMenuHelper } from './RadialMenuHelper';


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

  public isPointerDown = false;

  public menuItemLabels: string[];

  public targetIndex = -1;

  private menuItemCount = 0;

  private radiusUnit = 'px';
  private menuRadiusPx = 150;                             // unit depentds on radiusUnit value: 'px', 'vmin', ...
  private offsetAngle = 0;
  private cancelDistanceToOriginDistance = 50;           // Pixel

  private pointerDownPosition: Point = new Point();
  private pointerUpPosition: Point = new Point();
  private currentPointerPosition: Point = new Point();

  private selectedItemColor = 'blue';
  private unselectedColor = 'black';
  private mouseDownMarkerColor = this.unselectedColor;
  private activeCircleBackgroundColor = 'darkred';



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
    this.isPointerDown = false;
    this.pointerDownPosition.reset();

    this.updateItemSelection();
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

    if (this.isPointerDown) {
      if (this.hasTarget) {
        const angleToTarget = RadialMenuHelper.calculateAngleToItemOnCircle(Math.max(0, this.targetIndex), this.offsetAngle);
        const startAngle = (angleToTarget + 90 - this.offsetAngle * .5);
        const endAngle = (angleToTarget + 90 + this.offsetAngle * .5);
        const backgroundColor = this.activeCircleBackgroundColor;
        const style = 'linear-gradient(' + endAngle + 'deg, transparent 50%, ' + backgroundColor + ' 50%), ' +
          'linear-gradient(' + startAngle + 'deg, ' + backgroundColor + ' 50%, transparent 50%)';

        activeCircleSector.style.opacity = '0.5';
        activeCircleSector.style.backgroundImage = style;
        return style;
      }
    }
    activeCircleSector.style.opacity = '0';
    return '';
  }

  private updateMarker(): void {
    // DOM query
    const mouseDownMarker = document.querySelector('.mouse-down-marker') as HTMLElement;

    if (!mouseDownMarker) {
      return;
    }

    if (this.isPointerDown) {
      mouseDownMarker.style.color = this.mouseDownMarkerColor;
      mouseDownMarker.style.opacity = '1';
      RadialMenuHelper.moveToPosition(mouseDownMarker, this.pointerDownPosition);
      // mouseDownMarker.style.left = (this.pointerDownPosition.x - mouseDownMarker.clientWidth * .5) + 'px';
      // mouseDownMarker.style.top = (this.pointerDownPosition.y - mouseDownMarker.clientHeight * .5) + 'px';
    } else {
      mouseDownMarker.style.opacity = '0';
    }
  }
  // STYLING VIEW END


  // TOUCH EVENTS

  // PRESS
  public onPress(event): void {
    const pageScrollOffset: Point = RadialMenuHelper.pageScrollOffset();

    console.log(pageScrollOffset);

    this.pointerDownPosition.x = event.changedPointers[0].clientX + pageScrollOffset.x;
    this.pointerDownPosition.y = event.changedPointers[0].clientY + pageScrollOffset.y;
    this.isPointerDown = true;
    this.showMenu();
  }

  public onPressUp(event): void {
    this.pointerUpPosition.x = event.changedPointers[0].clientX;
    this.pointerUpPosition.y = event.changedPointers[0].clientY;
    this.isPointerDown = false;

    console.log(event);
  }
  // PRESS END

  // PAN
  // PAN END
  public onPan(event): void {
    // console.log('onPan');
  }

  public onPanMove(event): void {
    if (!event.changedPointers || event.changedPointers.length === 0) {
      return;
    }

    const pointerEvent = event.changedPointers[0];

    const position: Point = RadialMenuHelper.getScreenPosition(pointerEvent.clientX, pointerEvent.clientY);
    // const pageScrollOffset: Point = RadialMenuHelper.pageScrollOffset();
    // const x = pointerEvent.clientX + pageScrollOffset.x;
    // const y = pointerEvent.clientY + pageScrollOffset.y;
    // update current pointer position
    this.currentPointerPosition.x = position.x;
    this.currentPointerPosition.y = position.y;

    this.updateMenu();
  }

  public onPanCancel(event): void {

  }

  public onPanLeft(event): void {

  }

  public onPanRight(event): void {

  }

  public onPanUp(event): void {

  }

  public onPanDown(event): void {

  }
  // PAN END

  /**
   * sets position for menu.
   * is switched to "on", here!
   */
  private showMenu(): void {
    // DOM query
    const menu: HTMLElement = document.querySelector('#menu-item-container');
    RadialMenuHelper.moveToPosition(menu, this.pointerDownPosition);
  }

  // TOUCH EVENTS END

  // MOUSE EVENTS
  public mouseDown(event: MouseEvent): void {
    const position: Point = RadialMenuHelper.getScreenPosition(event.clientX, event.clientY);
    this.pointerDownPosition.x = position.x;
    this.pointerDownPosition.y = position.y;
    this.isPointerDown = true;

    this.updateMarker();
  }

  public mouseUp(event: MouseEvent): void {
    const position: Point = RadialMenuHelper.getScreenPosition(event.clientX, event.clientY);
    this.pointerUpPosition.x = position.x;
    this.pointerUpPosition.y = position.y;
    this.isPointerDown = false;

    this.updateMarker();
  }

  public mouseUpOutside(event: MouseEvent): void {
    this.mouseUp(event);
  }


  /**
   * Tracks Mouse Movement
   * Menu Item Selection
   */
  public mouseMove(event: MouseEvent): void {
    if (!this.isPointerDown) {
      return;
    }

    const position: Point = RadialMenuHelper.getScreenPosition(event.clientX, event.clientY);
    this.currentPointerPosition.x = position.x;
    this.currentPointerPosition.y = position.y;

    this.updateMenu();
  }
  // MOUSE EVENTS END

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
      // return;
    }

    if (oldTargetIndex !== this.targetIndex) {
      this.selectedTargetIndex.emit(this.targetIndex);
    }
    this.showMenu();
    // update active section
    this.getActiveSectorStyle();

    // highlight selected DOM element
    this.updateItemSelection();

  }

  private checkMenuCancel(): boolean {
    const distanceToOrigin: number = RadialMenuHelper.calculateDistance(this.pointerDownPosition, this.currentPointerPosition);
    return distanceToOrigin < this.cancelDistanceToOriginDistance;
  }

  private hideMenu(): void {
    // unselect target
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
      position = RadialMenuHelper.calculateCurrentPositionOnCircle(this.pointerDownPosition,
        this.currentPointerPosition,
        this.menuRadiusPx,
        angle);

      // calculate distance to current position on circle
      distance = RadialMenuHelper.calculateDistance(this.currentPointerPosition, position);

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
