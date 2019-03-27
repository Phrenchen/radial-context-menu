import { Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { Memo } from '../model/Memo';
import { LinkedList } from '../model/LinkedList';
import { GenericMemo } from '../model/GenericMemo';

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.css']
})
export class MemoListComponent implements OnInit {

  @Input() memos: LinkedList<Memo<GenericMemo>> = new LinkedList<Memo<GenericMemo>>();

  @Output() deleteMemo: EventEmitter<string> = new EventEmitter<string>();
  @Output() addEvoToMemo: EventEmitter<string> = new EventEmitter<string>();

  // @ViewChild('memolist') memolist: TemplateRef;

  // LIFE CYCLE
  constructor() { }

  ngOnInit() {
    console.log(this.memos.size());
  }
  // LIFE CYCLE END

  public deleteItem(memoIndex: string): void {
    this.deleteMemo.emit(memoIndex);
  }

  public addEvo(memoId: string): void {
    this.addEvoToMemo.emit(memoId);
  }
}
