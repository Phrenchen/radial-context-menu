import { Point } from './model/Point';

export class RadialMenuHelper {

    public static hasSelectedTarget(targetIndex: number): boolean {
        // console.log(targetIndex);
        // console.log('has selected target? ' + (targetIndex !== -1));
        return targetIndex !== -1;
    }

    public static calculateDistance(p1: Point, p2: Point): number {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    public static calculateAngleToItemOnCircle(index: number, offsetAngle: number): number {
        return offsetAngle * index;
    }

    /**
     * calculate closest item-position on the menu circle
     * then we can get the index of the closest item and apply attached action
     * actions:
     *  - open details
     *  - more information about
     *  - delete menu-target
     */
    public static calculateCurrentPositionOnCircle(center: Point, targetPosition: Point, radius: number, angle: number): Point {
        angle -= 90;
        const radians = angle * (Math.PI / 180);
        const positionOnCircle: Point = new Point(center.x + radius * Math.cos(radians),
            center.y + radius * Math.sin(radians));

        return positionOnCircle;
    }

    public static updateMenuItems(menuItems: NodeListOf<HTMLElement>, selectedIndex: number, selectedItemColor, unselectedItemColor): void {

        menuItems.forEach((item, index) => {
          if (index === selectedIndex) {
            item.style.color = selectedItemColor;
            item.style.fontWeight = 'bold';
            item.style.fontSize = '30px';
          } else {
            // TODO: only reset last active item. new member 'lastSelectedIndex
            item.style.color = unselectedItemColor;
            item.style.fontWeight = 'normal';
            item.style.fontSize = '15px';
          }
        });
      }

      public static moveToPosition(item: HTMLElement, position: Point): void {
        // const mouseDownMarker = document.querySelector('.menu-item-container') as HTMLElement;
        if (!item || !position) {
          return;
        }
        item.style.left = (position.x - item.clientWidth * .5) + 'px';
        item.style.top = (position.y - item.clientHeight * .5) + 'px';
      }

      // calculates offset of browser scrolling content
      // used to position menu
      // TODO: calculate and cache once per frame!
      //   no idea how expensive this is. will be calculated multiple times on pointer-move...
      // CHECK if performance goes down!
      public static pageScrollOffset(): Point {
        const top  = window.pageYOffset || document.documentElement.scrollTop;
        const left = window.pageXOffset || document.documentElement.scrollLeft;

        return new Point(left, top);
      }

      public static getScreenPosition(x: number, y: number): Point {
        const pageScrollOffset: Point = RadialMenuHelper.pageScrollOffset();
        return new Point(x + pageScrollOffset.x, y + pageScrollOffset.y);
      }
}
