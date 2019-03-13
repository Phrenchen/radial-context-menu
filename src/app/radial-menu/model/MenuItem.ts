import { MenuAction } from './MenuAction';

/**
 * represents the payload of an 'enhanced' item which
 * - offers actions selectable via menu
 * - carries data object
 */
export class MenuItem {
    public id: string = null;
    public title = 'menu item';
    public description = 'item description';

    public label = '';
    public height = 1;
    public width = 1;

    public data: any = {};

    public actions: Array<MenuAction> = new Array<MenuAction>();

    constructor() {

    }
}
