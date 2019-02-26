export class Point {

    public x: number;
    public y: number;


    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public angleTo(targetPosition: Point): number {
        const deltaX = targetPosition.x - this.x;
        const deltaY = targetPosition.y - this.y;
        const angle = Math.atan2(deltaY, deltaX);

        return angle;
    }
}