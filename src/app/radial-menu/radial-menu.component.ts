import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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

  public isMouseDown = false;

  public menuItemLabels: string[];
  public targetIndex = -1;

  private menuItemCount = 0;
  private origin: Point = new Point();

  // private radiusUnit = 'vmin';
  private radiusUnit = 'px';
  private menuRadiusPx = 150;
  private offsetAngle = 0;

  private mouseDownPosition: Point = new Point();
  private mouseUpPosition: Point = new Point();
  private currentMousePosition: Point = new Point();


  constructor() {
    this.resetMenu();
  }

  ngOnInit() { }

  ngAfterViewInit(): void { }

  public showPortfolioMenu(): void {
    this.menuItemLabels = ['home', 'about', 'work', 'contact'];
    this.initMenuConfiguration();
  }

  public resetMenu(itemCount = -1): void {
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
    this.targetIndex = -1;
    this.isMouseDown = false;
    this.mouseDownPosition.reset();

    this.updateItemSelection();
  }

  public getMenuItemStyle(index: number): string {
    const radius = index >= 0 ? this.menuRadiusPx : 1;
    index = index >= 0 ? index : 0;
    const rotateAngle = this.calculateAngleToItemOnCircle(index);

    const styleStr = 'rotate(' + rotateAngle + 'deg) translate(0, -' + radius + this.radiusUnit + ') rotate(-' + rotateAngle + 'deg)';
    return styleStr;
  }

  /**
   * Tracks Mouse Movement
   * Menu Item Selection
   */
  public mouseMove(event: MouseEvent): void {
    if (!this.isMouseDown) {
      return;
    }
    this.currentMousePosition.x = event.clientX;
    this.currentMousePosition.y = event.clientY;


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
      position = this.calculateCurrentPositionOnCircle(this.mouseDownPosition,
        this.currentMousePosition,
        this.menuRadiusPx,
        angle);

      // calculate distance to current position on circle
      distance = this.calculateDistance(this.currentMousePosition, position);

      if (distance < minDistance) {
        candidateIndex = i;
        minDistance = distance;
      }
    }

    // calculate index
    this.targetIndex = candidateIndex;

    // update active section
    this.getActiveSectorStyle();

    // highlight selected DOM element
    this.updateItemSelection();
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
        item.style.color = 'red';
        item.style.fontWeight = 'bold';
        item.style.fontSize = '30px';
      } else {
        // TODO: only reset last active item. new member 'lastSelectedIndex
        item.style.color = 'black';
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

  private calculateAngle(mouseDownPosition: Point, mouseUpPosition: Point): number {
    return mouseDownPosition.angleTo(mouseUpPosition);
  }

  /**
   * calculate closest item-position on the menu circle
   * then we can get the index of the closest item and apply attached action
   * actions:
   *  - open details
   *  - more information about
   *  - delete menu-target
   */
  public calculateCurrentPositionOnCircle(center: Point, targetPosition: Point, radius: number, angle: number): Point {
    angle -= 90;
    const radians = angle * (Math.PI / 180);
    const positionOnCircle: Point = new Point(center.x + radius * Math.cos(radians),
      center.y + radius * Math.sin(radians));

    return positionOnCircle;
  }

  private get hasTarget(): boolean {
    return this.targetIndex !== -1;
  }

  private getActiveSectorStyle(): string {
    const activeCircleSector = document.querySelector('.active-circle-sector') as HTMLElement;

    if (!activeCircleSector) {
      return;
    }

    if (this.isMouseDown) {
      if (this.hasTarget) {
        const angleToTarget = this.calculateAngleToItemOnCircle(Math.max(0, this.targetIndex));
        const startAngle = (angleToTarget + 90 - this.offsetAngle * .5);
        const endAngle = (angleToTarget + 90 + this.offsetAngle * .5);
        const backgroundColor = 'lightgreen';
        const style = 'linear-gradient(' + endAngle + 'deg, transparent 50%, ' + backgroundColor + ' 50%), ' +
          'linear-gradient(' + startAngle + 'deg, ' + backgroundColor + ' 50%, transparent 50%)';

        activeCircleSector.style.opacity = '.50';
        activeCircleSector.style.backgroundImage = style;
        return style;
      }
    }
    activeCircleSector.style.opacity = '0';
    return '';
  }

  private updateMarker(): void {
    const mouseDownMarker = document.querySelector('.mouse-down-marker') as HTMLElement;

    if (!mouseDownMarker) {
      return;
    }

    if (this.isMouseDown) {
      mouseDownMarker.style.opacity = '1';
      mouseDownMarker.style.left = (this.mouseDownPosition.x - mouseDownMarker.clientWidth * .5) + 'px';
      mouseDownMarker.style.top = (this.mouseDownPosition.y - mouseDownMarker.clientHeight * .5) + 'px';
    } else {
      mouseDownMarker.style.opacity = '0';
    }
  }

  public mouseDown(event: MouseEvent): void {
    this.mouseDownPosition.x = event.clientX;
    this.mouseDownPosition.y = event.clientY;
    this.isMouseDown = true;

    this.updateMarker();
  }

  public mouseUp(event: MouseEvent): void {
    this.mouseUpPosition.x = event.clientX;
    this.mouseUpPosition.y = event.clientY;

    this.isMouseDown = false;

    this.updateMarker();
  }

  public mouseUpOutside(event: MouseEvent): void {
    this.mouseUp(event);
  }
}
