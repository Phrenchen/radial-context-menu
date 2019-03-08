import { InputStrategy } from './strategies/InputStrategy';
import { MouseInputStrategy } from './strategies/MouseInputStrategy';
import { InputState } from './model/InputState';
import { Point } from '../model/Point';
import { MenuItemDirective } from 'src/app/directives/menu-item.directive';

/**
 * Registers User Input
 * Provides
 *  - Pointer position
 *  - Pointer state: up, down, gestures (comes later)
 */
export class InputManager {

    private containerId: string;
    private inputStrategies: InputStrategy[] = [];



    constructor(containerId: string) {
        this.containerId = containerId;
        this.init();
    }

    public registerTargets(targetIds: Array<MenuItemDirective>): void {
        if (targetIds) {
            this.inputStrategies.forEach(strategy => {
                strategy.registerTargets(targetIds);
            });
        }
    }

    public update(deltaTime: number = -1): void {
        // update all active input strategies
        // console.log('update all active input strategies');
        this.inputStrategies.forEach(strategy => {
            strategy.update();
        });

    }

    public isCurrentState(state: InputState): boolean {
        return this.inputStrategies[0].state === state;
    }

    public set state(value: InputState) {
        this.inputStrategies[0].state = value;
    }
    // forward strategy-results
    public get state(): InputState {
        return this.inputStrategies[0].state;
    }

    public get currentPosition(): Point {
        return this.inputStrategies[0].currentPosition;
    }

    public get downPosition(): Point {
        return this.inputStrategies[0].downPosition;
    }

    public get upPosition(): Point {
        return this.inputStrategies[0].upPosition;
    }
    // forward strategy-results end


    // private
    private init(): void {
        this.inputStrategies.push(new MouseInputStrategy(this.containerId));
    }
}
