import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsdetailComponent } from './itemsdetail.component';

describe('ItemsdetailComponent', () => {
  let component: ItemsdetailComponent;
  let fixture: ComponentFixture<ItemsdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
