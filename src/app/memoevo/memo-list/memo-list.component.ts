import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, ViewChildren, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { Memo } from '../model/Memo';
import { LinkedList } from '../model/LinkedList';
import { GenericMemo } from '../model/GenericMemo';
import { MenuItemDirective } from 'src/app/directives/menu-item.directive';
import { MenuItem } from 'src/app/radial-menu/model/MenuItem';
import { MenuService } from 'src/app/radial-menu/services/menu.service';

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.css']
})
export class MemoListComponent implements OnInit, AfterContentInit, OnChanges {



  @Input() memos: LinkedList<Memo<GenericMemo>> = new LinkedList<Memo<GenericMemo>>();

  @ViewChildren(MenuItemDirective) menuItemDirectives: Array<MenuItemDirective>;

  @Output() deleteMemo: EventEmitter<string> = new EventEmitter<string>();
  @Output() addToMemo: EventEmitter<string> = new EventEmitter<string>();

  // @ViewChild('memolist') memolist: TemplateRef;

  // LIFE CYCLE
  constructor(private menuService: MenuService) { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.updateMenuItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateMenuItems();
  }
  // LIFE CYCLE END

  private updateMenuItems(): void {
    if (!this.menuItemDirectives) {
      console.log('no menu items.');
      return;
    }

    console.log(this.memos);
    console.log('updating with ' + this.menuItemDirectives.length + ' menuItems.');

    this.menuItemDirectives.forEach(item => {
      const menuItem: MenuItem = this.menuService.enhanceItem(item);

      if (menuItem) {
        console.log('enhanced item: ');
        console.log(menuItem);
        this.menuService.addItem(menuItem);
      }
    });
  }

  public deleteItem(memoIndex: string): void {
    this.deleteMemo.emit(memoIndex);
  }

  public addMemo(memoId: string): void {
    this.addToMemo.emit(memoId);
  }
}
