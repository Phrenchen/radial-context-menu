import { Point } from '../../model/Point';
import { InputState } from '../model/InputState';
import { MenuItem } from '../../model/MenuItem';
import { MenuService } from '../../services/menu.service';

export class InputStrategy {

    // subclasses update these values
    protected container: HTMLElement;

    protected currentState: InputState = InputState.NONE;
    protected currPosition: Point = new Point();
    protected downPos: Point = new Point();
    protected upPos: Point = new Point();
    
    public selectedMenuItem: MenuItem = null;
    public selectedTarget: HTMLElement = null;


    constructor(private containerId: string, protected menuService: MenuService) {
        this.init();
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



    // protected. override and call
    protected init(): void {
        this.container = document.querySelector('#' + this.containerId);
    }

    protected tryMenuTarget(event: MouseEvent): void {

        let menuItemCandidate: MenuItem;
        let targetCandidate: HTMLElement;

        const path: EventTarget[] = event.composedPath();

        // for each path element
        for (let i = 0; i < path.length; i++) {
            const pathElement = path[i];
            const candidate: HTMLElement = pathElement as HTMLElement;

            if (candidate.id && candidate.id !== '') {
                menuItemCandidate = this.menuService.getMenuItemById(candidate.id);
                targetCandidate = candidate;
            }

            if (menuItemCandidate) {
                break;
            }
        }

        if (menuItemCandidate) {
            // console.log('selected target: ' + menuItemCandidate.id);
            console.log(menuItemCandidate);
            // console.log(targetCandidate);
            this.selectedMenuItem = menuItemCandidate;
            this.selectedTarget = targetCandidate;

            targetCandidate.style.color = 'red';
            targetCandidate.style.border = '1px dotted black';

        }
    }

    public toString(): string {
        return 'input: ' + this.state + ' at ' + this.currPosition;
    }
}
