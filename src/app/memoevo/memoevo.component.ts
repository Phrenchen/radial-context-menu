import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-memoevo',
  templateUrl: './memoevo.component.html',
  styleUrls: ['./memoevo.component.css']
})
export class MemoevoComponent implements OnInit {

  public newMemoForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    memohashtags: new FormControl(''),
    author: new FormGroup({
      name: new FormControl('', [Validators.required]),
      nick: new FormControl('', []),
      email: new FormControl('', [Validators.email])
    })

  });

  // LIFE CYCLE
  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    console.log(this.newMemoForm);
  }
  // LIFE CYCLE END

  public addNewMemo(value: any): void {
    console.log('add memo');
    console.log(value);
  }


}
