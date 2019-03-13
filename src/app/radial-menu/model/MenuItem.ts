import { MenuAction } from './MenuAction';

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
