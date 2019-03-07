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

    protected targetIds: Array<string> = new Array<string>();


    constructor(containerId: string) {
        this.containerId = containerId;
        this.init();
    }

    /**
     * @param targetId used as document.querySelector(targetId);
     */
    public registerTargets(targetIds: Array<string>): void {
        if (targetIds) {
            targetIds.forEach(id => {
                if (this.targetIds.indexOf(id) === -1) {
                    this.targetIds.push(id);
                }
            });
        }
    }

    public update(deltaTime: number = -1): void {
        // todo
    }

    // called by subclasses
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



    // protected
    protected init(): void {
        // overwrite!
        console.log('todo: add handler');
        this.container = document.querySelector('#' + this.containerId);
    }

    protected tryMenuTarget(event: MouseEvent): void {
        const target: HTMLElement = event.target as HTMLElement;

        if (!target) {
            return;
        }
        const selectedTargetId = target.id;
        // find registered target and dispatch event with target.id

        // console.log(selectedTargetId);
        // console.log(this.targetIds);

        const targetId = this.targetIds.find(element => {
            return element === selectedTargetId;
        });

        if (targetId) {
            console.log(targetId);
        }
    }




    public toString(): string {
        return 'input: ' + this.state + ' at ' + this.currPosition;
    }
}
