import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoevoComponent } from './memoevo.component';

describe('MemoevoComponent', () => {
  let component: MemoevoComponent;
  let fixture: ComponentFixture<MemoevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
