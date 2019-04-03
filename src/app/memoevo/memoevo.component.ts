import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MemoService } from './memo.service';
import { Memo } from './model/Memo';
import { GenericMemo } from './model/GenericMemo';
import { MathHelper } from 'src/helper/MathHelper';

@Component({
  selector: 'app-memoevo',
  templateUrl: './memoevo.component.html',
  styleUrls: ['./memoevo.component.css']
})
export class MemoevoComponent implements OnInit {

  public memos: Array<Memo<GenericMemo>>;

  private thumbnailVarietyCount = 24;

  public newMemoForm = new FormGroup({
    title: new FormControl('Cats!', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('How cats achieve world domination', [Validators.required, Validators.minLength(10)]),
    memohashtags: new FormControl('#cats'),
    author: new FormGroup({
      name: new FormControl('author name', [Validators.required]),
      nick: new FormControl('', []),
      email: new FormControl('author@email.de', [Validators.email])
    }),
    thumbnail: new FormControl('assets/images/thumbnail-001.jpg'),
    url: new FormControl('')
  });

  public showAddToMemoForm = false;

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
        console.log(this.memos);
      });
  }

  public addNewMemo(): void {
    const title = this.newMemoForm.get('title').value;
    const description = this.newMemoForm.get('description').value;
    const memoHashTags = this.newMemoForm.get('memohashtags').value;
    const url = this.newMemoForm.get('url').value;
    // console.log(this.newMemoForm);

    // set thumbnail: select from fixed set of images
    let thumbnail: string = this.newMemoForm.get('thumbnail').value;
    // const thumbIndex = (this.memos.length % this.thumbnailVarietyCount) + 1;  // rotate through thumbnails
    const thumbIndex = MathHelper.getRandomInt(1, this.thumbnailVarietyCount);
    const prefix = '0';
    const desiredLength = 3;
    const suffix = '-' + this.fillWithLeadingPrefix(thumbIndex.toString(), prefix, desiredLength) + '.jpg';
    thumbnail = thumbnail.split('-')[0] + suffix;

    // initialize with no neighbors.^
    const neighbours: Array<string> = new Array<string>();
    // TODO: add to parentMemo.addNeighbour(

    const creatorId = '-1';

    this.memoService.addMemo(title, description, memoHashTags, thumbnail, url, neighbours, creatorId)
      .subscribe(res => {
        // adding memo complete
        // console.log(res);
        this.getMemos();
      });
  }

  private fillWithLeadingPrefix(source: string, prefix: string, desiredLength: number): string {
    if ((!source || !prefix) || (source && source.length >= desiredLength)) {
      return source;
    }

    let result = source;
    // source is too short.
    // fill up with prefix until desiredLength is reached
    while (result.length + prefix.length <= desiredLength) {
      // result = result.concat(prefix);
      result = prefix.concat(result);
    }
    return result;
  }


  public deleteMemo(id: string): void {
    this.memoService.deleteMemo(id)
      .subscribe(res => {
        console.log('deleting memo complete');

        this.getMemos();
      });
  }

  public addToMemo(memoId: string): void {
    this.showAddToMemoForm = true;

    // TODO: attach new memo to existing memo.
  }
}
