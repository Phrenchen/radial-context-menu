import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Memo } from '../model/Memo';

@Component({
  selector: 'app-memo-list',
  templateUrl: './memo-list.component.html',
  styleUrls: ['./memo-list.component.css']
})
export class MemoListComponent implements OnInit {

  @Input() memos: Array<Memo>;

  @Output() deleteMemo: EventEmitter<string> = new EventEmitter<string>();

  // LIFE CYCLE
  constructor() { }

  ngOnInit() {
  }
  // LIFE CYCLE END

  public deleteItem(memoIndex: string): void {
    this.deleteMemo.emit(memoIndex);
  }
}
