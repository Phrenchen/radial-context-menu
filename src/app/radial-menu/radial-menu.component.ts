import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Point } from './model/Point';


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

  public isPointerDown = false;

  public menuItemLabels: string[];
  public targetIndex = -1;

  private menuItemCount = 0;

  private radiusUnit = 'px';
  private menuRadiusPx = 150;
  private offsetAngle = 0;

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
    const rotateAngle = this.calculateAngleToItemOnCircle(index);

    const styleStr = 'rotate(' + rotateAngle + 'deg) translate(0, -' + radius + this.radiusUnit + ') rotate(-' + rotateAngle + 'deg)';
    return styleStr;
  }



  private getActiveSectorStyle(): string {
    // DOM query
    const activeCircleSector = document.querySelector('.active-circle-sector') as HTMLElement;

    if (!activeCircleSector) {
      return;
    }

    if (this.isPointerDown) {
      if (this.hasTarget) {
        const angleToTarget = this.calculateAngleToItemOnCircle(Math.max(0, this.targetIndex));
        const startAngle = (angleToTarget + 90 - this.offsetAngle * .5);
        const endAngle = (angleToTarget + 90 + this.offsetAngle * .5);
        const backgroundColor = this.activeCircleBackgroundColor;
        const style = 'linear-gradient(' + endAngle + 'deg, transparent 50%, ' + backgroundColor + ' 50%), ' +
          'linear-gradient(' + startAngle + 'deg, ' + backgroundColor + ' 50%, transparent 50%)';

        // activeCircleSector.style.top = this.currentPointerPosition.y.toString();
        // activeCircleSector.style.left = this.currentPointerPosition.x.toString();
        // this.setPositionToCurrentPointer(activeCircleSector, this.currentPointerPosition);
        activeCircleSector.style.opacity = '0.5';
        activeCircleSector.style.backgroundImage = style;
        return style;
      }
    }
    activeCircleSector.style.opacity = '0';
    return '';
  }

  private setPositionToCurrentPointer(item: HTMLElement, position: Point): void {
    // const mouseDownMarker = document.querySelector('.menu-item-container') as HTMLElement;
    if (!item || !position) {
      return;
    }
    item.style.left = (position.x - item.clientWidth * .5) + 'px';
    item.style.top = (position.y - item.clientHeight * .5) + 'px';
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
      this.setPositionToCurrentPointer(mouseDownMarker, this.pointerDownPosition);
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
    this.pointerDownPosition.x = event.changedPointers[0].clientX;
    this.pointerDownPosition.y = event.changedPointers[0].clientY;
    this.isPointerDown = true;
    this.showMenu();
  }

  public onPressUp(event): void {
    this.pointerUpPosition.x = event.changedPointers[0].clientX;
    this.pointerUpPosition.y = event.changedPointers[0].clientY;
    this.isPointerDown = false;
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
    const x = pointerEvent.clientX;
    const y = pointerEvent.clientY;

    // updatet current pointer position
    this.currentPointerPosition.x = x;
    this.currentPointerPosition.y = y;

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
    this.setPositionToCurrentPointer(menu, this.pointerDownPosition);
    // console.log('menu: ' + menu.style.top + ', ' + menu.style.left);
  }

  // TOUCH EVENTS END

  // MOUSE EVENTS
  public mouseDown(event: MouseEvent): void {
    this.pointerDownPosition.x = event.clientX;
    this.pointerDownPosition.y = event.clientY;
    this.isPointerDown = true;



    this.updateMarker();
  }

  public mouseUp(event: MouseEvent): void {
    this.pointerUpPosition.x = event.clientX;
    this.pointerUpPosition.y = event.clientY;

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
    this.currentPointerPosition.x = event.clientX;
    this.currentPointerPosition.y = event.clientY;

    this.updateMenu();
  }
  // MOUSE EVENTS END

  // PRIVATE
  private updateMenu(): void {
    this.targetIndex = this.calculateTargetIndex();
    this.showMenu();
    // update active section
    this.getActiveSectorStyle();

    // highlight selected DOM element
    this.updateItemSelection();
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
      angle = this.calculateAngleToItemOnCircle(i);
      position = this.calculateCurrentPositionOnCircle(this.pointerDownPosition,
        this.currentPointerPosition,
        this.menuRadiusPx,
        angle);

      // calculate distance to current position on circle
      distance = this.calculateDistance(this.currentPointerPosition, position);

      if (distance < minDistance) {
        candidateIndex = i;
        minDistance = distance;
      }
    }

    return candidateIndex;
  }

  // ITEM SELECTION
  /**
   * calculate closest item-position on the menu circle
   * then we can get the index of the closest item and apply attached action
   * actions:
   *  - open details
   *  - more information about
   *  - delete menu-target
   */
  private calculateCurrentPositionOnCircle(center: Point, targetPosition: Point, radius: number, angle: number): Point {
    angle -= 90;
    const radians = angle * (Math.PI / 180);
    const positionOnCircle: Point = new Point(center.x + radius * Math.cos(radians),
      center.y + radius * Math.sin(radians));

    return positionOnCircle;
  }



  private updateItemSelection(): void {
    const menuItems: NodeListOf<HTMLElement> = document.querySelectorAll('.menu-item') as NodeListOf<HTMLElement>;
    if (menuItems && menuItems.length >= this.targetIndex) {
      this.updateMenuItems(menuItems, this.targetIndex);
    }
  }

  private updateMenuItems(menuItems: NodeListOf<HTMLElement>, selectedIndex: number): void {
    menuItems.forEach((item, index) => {
      if (index === selectedIndex) {
        item.style.color = this.selectedItemColor;
        item.style.fontWeight = 'bold';
        item.style.fontSize = '30px';
      } else {
        // TODO: only reset last active item. new member 'lastSelectedIndex
        item.style.color = this.unselectedColor;
        item.style.fontWeight = 'normal';
        item.style.fontSize = '15px';
      }
    });
  }

  private calculateDistance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  private calculateAngleToItemOnCircle(index: number): number {
    return this.offsetAngle * index;
  }

  // private calculateAngle(mouseDownPosition: Point, mouseUpPosition: Point): number {
  //   return mouseDownPosition.angleTo(mouseUpPosition);
  // }

  private get hasTarget(): boolean {
    return this.targetIndex !== -1;
  }
  // ITEM SELECTION END
}
