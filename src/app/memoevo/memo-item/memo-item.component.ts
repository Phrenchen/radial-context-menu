import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Memo } from '../model/Memo';
import { INode } from '../model/LinkedList';
import { GenericMemo } from '../model/GenericMemo';
import { StringHelper } from 'src/helper/StringHelper';

@Component({
  selector: 'app-memo-item',
  templateUrl: './memo-item.component.html',
  styleUrls: ['./memo-item.component.css']
})
export class MemoItemComponent implements OnInit, OnChanges {

  @Input() memo: Memo<GenericMemo>;
  @Output() deleteMemo: EventEmitter<string> = new EventEmitter<string>();
  @Output() addEvoToMemo: EventEmitter<string> = new EventEmitter<string>();

  public showDetails = false;

  public urlForDisplay = '';

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.memo) {
      let url = this.memo.url;
      url = StringHelper.strip(url, ['https://']);
      this.urlForDisplay = StringHelper.abbreviate(url, 30, '...');

    }
  }

  public delete(): void {
    console.log(this.memo._id);
    this.deleteMemo.emit(this.memo._id);
  }

  public addEvo(event: MouseEvent): void {
    event.stopPropagation();
    this.addEvoToMemo.emit(this.memo._id);
  }

  public toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}
