import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Memo } from '../model/Memo';
import { INode } from '../model/LinkedList';
import { GenericMemo } from '../model/GenericMemo';

@Component({
  selector: 'app-memo-item',
  templateUrl: './memo-item.component.html',
  styleUrls: ['./memo-item.component.css']
})
export class MemoItemComponent implements OnInit {

  @Input() memo: Memo<GenericMemo>;
  @Output() deleteMemo: EventEmitter<string> = new EventEmitter<string>();
  @Output() addEvoToMemo: EventEmitter<string> = new EventEmitter<string>();

  public showDetails = false;

  constructor() { }

  ngOnInit() {
  }


  public delete(): void {
    console.log(this.memo._id);
    this.deleteMemo.emit(this.memo._id);
  }

  public addEvo(): void {
    this.addEvoToMemo.emit(this.memo._id);
  }

  public toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}
