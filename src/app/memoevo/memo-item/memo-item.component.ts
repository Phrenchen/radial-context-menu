import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Memo } from '../model/Memo';

@Component({
  selector: 'app-memo-item',
  templateUrl: './memo-item.component.html',
  styleUrls: ['./memo-item.component.css']
})
export class MemoItemComponent implements OnInit {

  @Input() memo: Memo;
  @Output() deleteMemo: EventEmitter<string> = new EventEmitter<string>();

  public showDetails = false;

  constructor() { }

  ngOnInit() {
  }


  public delete(): void {
    console.log(this.memo._id);
    this.deleteMemo.emit(this.memo._id);
  }

  public toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}
