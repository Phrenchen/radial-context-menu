import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMinimapComponent } from './menu-minimap.component';

describe('MenuMinimapComponent', () => {
  let component: MenuMinimapComponent;
  let fixture: ComponentFixture<MenuMinimapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuMinimapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMinimapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
