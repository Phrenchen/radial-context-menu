import { Point } from '../../model/Point';
import { InputState } from '../model/InputState';

export class InputStrategy {

    // subclasses update these values
    private containerId = '';
    protected container: HTMLElement;

    protected currentState: InputState = InputState.NONE;
    protected currPosition: Point = new Point();
    protected downPos: Point = new Point();
    protected upPos: Point = new Point();

    constructor(containerId: string) {
        this.containerId = containerId;
        this.init();
    }

    public update(deltaTime: number = -1): void {
        // todo
    }


    public set state(value: InputState) {
        this.currentState = value;
    }

    public get state(): InputState {
        return this.currentState;
    }

    public get currentPosition(): Point {
        return this.currPosition;
    }

    public get downPosition(): Point {
        return this.downPos;
    }

    public get upPosition(): Point {
        return this.upPos;
    }


    public toString(): string {
        return 'input: ' + this.state + ' at ' + this.currPosition;
    }

    // protected
    protected init(): void {
        // overwrite!
        // add handler
        console.log('todo: add handler');
        this.container = document.querySelector('#' + this.containerId);
    }
}
