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
  private menuItemCount = 0;
  private origin: Point = new Point();

  // private radiusUnit = 'vmin';
  private radiusUnit = 'px';
  private menuRadiusPx = 150;
  private offsetAngle = 0;

  private mouseDownPosition: Point = new Point();
  private mouseUpPosition: Point = new Point();
  private currentMousePosition: Point = new Point();

  private angleToTarget = 0;
  private currentPositionOnCircle: Point;
  private targetIndex = 0;
  private targetPositionOnCircle: Point;

  constructor() {
    this.menuItemLabels = [
      'item 0',
      'item 1',
      'item 2',
      'item 3',
      'item 4',
      'item 5',
      'item 6',
      'item 7',
      'item 8',
      'item 9',
    ];

    this.menuItemCount = this.menuItemLabels.length;
    this.offsetAngle = 360 / this.menuItemCount;
  }

  ngOnInit() { }

  ngAfterViewInit(): void { }

  public getMenuItemStyle(index: number): string {
    const rotateAngle = this.calculateAngleToItemOnCircle(index);
    const styleStr = 'rotate(' + rotateAngle + 'deg) translate(0, -' +
      this.menuRadiusPx + this.radiusUnit + ') rotate(-' + rotateAngle + 'deg)';
    return styleStr;
  }

  public mouseMove(event: MouseEvent): void {
    this.currentMousePosition.x = event.clientX;
    this.currentMousePosition.y = event.clientY;

    this.angleToTarget = this.calculateAngle(this.mouseDownPosition, this.currentMousePosition);
    this.currentPositionOnCircle = this.calculateCurrentPositionOnCircle(this.mouseDownPosition,
      this.currentMousePosition,
      this.menuRadiusPx,
      this.angleToTarget);

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
    this.targetPositionOnCircle = position;

    // console.log('selected item index: ' + this.targetIndex);

    // highlight selected DOM element
    const menuItems: NodeListOf<HTMLElement> = document.querySelectorAll('.menu-item') as NodeListOf<HTMLElement>;
    if (menuItems && menuItems.length >= this.targetIndex) {
      this.updateMenuItemSelection(menuItems, this.targetIndex);
    }
  }

  private updateMenuItemSelection(menuItems: NodeListOf<HTMLElement>, selectedIndex: number): void {
    menuItems.forEach((item, index) => {
      if (index === selectedIndex) {
        item.style.color = 'red';
        item.style.fontWeight = 'bold';
      } else {
        item.style.color = 'black';
        item.style.fontWeight = 'normal';
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


  private updateMarker(): void {
    const mouseDownMarker = document.querySelector('.mouse-down-marker') as HTMLElement;
    if (!mouseDownMarker) {
      return;
    }

    if (this.isMouseDown) {
      // const markerWidth: number = Number.parseInt(mouseDownMarker.clientWidth, 2);
      // const markerHeight: number = Number.parseInt(mouseDownMarker.style.height, 2);
      mouseDownMarker.style.display = 'block';
      mouseDownMarker.style.left = (this.mouseDownPosition.x - mouseDownMarker.clientWidth * .5) + 'px';
      mouseDownMarker.style.top = (this.mouseDownPosition.y - mouseDownMarker.clientHeight * .5) + 'px';
      console.log(mouseDownMarker.clientWidth + ', ' + mouseDownMarker.clientHeight);
    } else {
      mouseDownMarker.style.display = 'none';
    }
  }

  public mouseDown(event: MouseEvent): void {
    // console.log('mouseDown');
    this.mouseDownPosition.x = event.clientX;
    this.mouseDownPosition.y = event.clientY;
    this.isMouseDown = true;

    this.updateMarker();
  }

  public mouseUp(event: MouseEvent): void {
    // console.log('mouseUp');
    this.mouseUpPosition.x = event.clientX;
    this.mouseUpPosition.y = event.clientY;

    this.isMouseDown = false;

    this.updateMarker();
  }

  public mouseUpOutside(event: MouseEvent): void {
    // console.log('mouseUpOutside');
    this.mouseUp(event);
  }

}
