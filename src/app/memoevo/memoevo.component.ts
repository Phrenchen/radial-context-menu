import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MemoService } from './memo.service';
import { Memo } from './model/Memo';

@Component({
  selector: 'app-memoevo',
  templateUrl: './memoevo.component.html',
  styleUrls: ['./memoevo.component.css']
})
export class MemoevoComponent implements OnInit {

  public memos: Array<Memo>;

  public newMemoForm = new FormGroup({
    title: new FormControl('a title', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('a description', [Validators.required, Validators.minLength(10)]),
    memohashtags: new FormControl('#cats'),
    author: new FormGroup({
      name: new FormControl('author name', [Validators.required]),
      nick: new FormControl('', []),
      email: new FormControl('author@email.de', [Validators.email])
    })

  });

  // LIFE CYCLE
  constructor(private formBuilder: FormBuilder, private memoService: MemoService) { }

  ngOnInit() {
    // console.log(this.newMemoForm);
    this.getMemos();
  }


  // LIFE CYCLE END
  /**
   * request memos
   */
  private getMemos(): void {

    this.memoService.getMemos()
      .subscribe(res => {
        // received memos
        this.memos = res;
      });
  }

  public addNewMemo(): void {
    const title = this.newMemoForm.get('title').value;
    const description = this.newMemoForm.get('description').value;
    const memoHashTags = this.newMemoForm.get('memohashtags').value;

    this.memoService.addMemo(title, description, memoHashTags)
      .subscribe(res => {
        // adding memo complete
        // console.log(res);
        this.getMemos();
      });
  }


  public deleteMemo(id: string): void {
    this.memoService.deleteMemo(id)
      .subscribe(res => {
        console.log('deleting memo complete');

        this.getMemos();
      });
  }
}
