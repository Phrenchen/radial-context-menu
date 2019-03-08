import { Point } from '../../model/Point';
import { InputState } from '../model/InputState';
import { MenuItemDirective } from 'src/app/directives/menu-item.directive';

export class InputStrategy {

    // subclasses update these values
    private containerId = '';
    protected container: HTMLElement;

    protected currentState: InputState = InputState.NONE;
    protected currPosition: Point = new Point();
    protected downPos: Point = new Point();
    protected upPos: Point = new Point();

    protected menuItems: Array<MenuItemDirective> = new Array<MenuItemDirective>();


    constructor(containerId: string) {
        this.containerId = containerId;
        this.init();
    }

    /**
     * TODO: use angular directives
     * @param targetId used as document.querySelector(targetId);
     */
    public registerTargets(menuItems: Array<MenuItemDirective>): void {
        if (menuItems) {
            menuItems.forEach(menuItem => {
                if (this.menuItems.indexOf(menuItem) === -1) {
                    this.menuItems.push(menuItem);
                    // console.log('added menu item adding up to: ' + this.menuItems.length + ' items.');
                    // console.log(this.menuItems);
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
        let target: HTMLElement = event.target as HTMLElement;

        if (!target) {
            return;
        }

        let selectedTarget;

        while (target) {
            selectedTarget = this.menuItems.find(element => {
                return element.id === target.id;
            });

            if (selectedTarget) {
                if (target.id === selectedTarget.id) {
                    // console.log('found parent element by id: ' + target.id);
                    break;
                } else {
                    target = target.parentElement;
                }
            }
            target = target.parentElement;
        }

        if (selectedTarget) {
            console.log('selected target: ' + selectedTarget.id);
            console.log(selectedTarget);
            // console.log(target);

            // selectedTarget

            target.style.color = 'red';
            target.style.border = '1px dotted black';

        }

        // find registered target and dispatch event with target.id

        // console.log(selectedTargetId);
        // console.log(this.menuItems);



    }




    public toString(): string {
        return 'input: ' + this.state + ' at ' + this.currPosition;
    }
}
