import { InputStrategy } from './InputStrategy';
import { InputState } from '../model/InputState';
import { Point } from '../../model/Point';
import { RadialMenuHelper } from '../../RadialMenuHelper';

export class MouseInputStrategy extends InputStrategy {


    constructor(containerId: string) {
        super(containerId);
    }

    public toString(): string {
        return 'mouse input: ' + this.state + ' at ' + this.currPosition;
    }

    // protected override

    

    private updatePosition(event: MouseEvent): void {
        const position: Point = RadialMenuHelper.getScreenPosition(event.clientX, event.clientY);
        this.downPos.x = position.x;
        this.downPos.y = position.y;

        // also set current position here because don´t want to wait for the move event
        this.currPosition.x = position.x;
        this.currPosition.y = position.y;
    }

    private updateMouseDown(event: MouseEvent): void {
        this.updatePosition(event);
        this.tryMenuTarget(event);
        // console.log('new down pos: ' + this.downPos);

        this.currentState = InputState.DOWN;

    }

    protected init(): void {
        super.init();

        if (!this.container) {
            return;
        }

        this.container.addEventListener('mousedown', (event: MouseEvent) => {
            this.updateMouseDown(event);
        });

        this.container.addEventListener('mouseup', (event: MouseEvent) => {
            // console.log(event);

            const position: Point = RadialMenuHelper.getScreenPosition(event.clientX, event.clientY);
            this.upPos.x = position.x;
            this.upPos.y = position.y;
            this.currentState = InputState.UP;
        });

        this.container.addEventListener('mousemove', (event: MouseEvent) => {
            // console.log(event);
            if (this.state === InputState.DOWN) {
                const position: Point = RadialMenuHelper.getScreenPosition(event.clientX, event.clientY);
                this.currPosition.x = position.x;
                this.currPosition.y = position.y;
            }
        });
    }
}
