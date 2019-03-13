import { MenuItem } from './MenuItem';

// private class
class MenuActionConfig {
    constructor(public label: string, public action: (menuAction: MenuItem) => boolean) {
        // console.log('constructing MenuActionConfig');
    }

    public toString(): string {
        return this.label + ': ';
    }
}

// public class
export class MenuAction {

    public static readonly CANCEL_ACTION: MenuAction = new MenuAction('menu_action_key_cancel_action',
                                                                    new MenuActionConfig('cancel', null));

    public static readonly SHOW_TITLE: MenuAction = new MenuAction('menu_action_key_show_title',
                                                                    new MenuActionConfig('title', MenuAction.showTitle));
    public static readonly SHOW_DESCRIPTION: MenuAction = new MenuAction('menu_action_key_show_description',
                                                                    new MenuActionConfig('description', null));
    public static readonly SHOW_DETAILS: MenuAction = new MenuAction('menu_action_key_show_details',
                                                                    new MenuActionConfig('details', null));
    public static readonly SHOW_THUMBNAIL: MenuAction = new MenuAction('menu_action_key_show_thumbnail',
                                                                    new MenuActionConfig('thumb', null));
    public static readonly OPEN_EXTERNAL_LINK: MenuAction = new MenuAction('menu_action_key_open_external_link',
                                                                    new MenuActionConfig('link', null));


    constructor(private key: string, public value: MenuActionConfig) {
        // console.log('create MenuAction');
    }

    public static showTitle(menuItem: MenuItem): boolean {
        // access DOM and display menuItem.title

        return false;
    }

    /**
     * 
     * @returns true if action is executed
     */
    public doAction(menuItem: MenuItem, container: HTMLElement = null): boolean {
        if (this.value.action) {
            this.value.action(menuItem);
            return true;
        }
        return false;
    }

    public toString(): string {
        return this.key;
    }
}

