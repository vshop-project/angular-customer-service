import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsgalleryComponent } from './itemsgallery.component';

describe('ItemsgalleryComponent', () => {
  let component: ItemsgalleryComponent;
  let fixture: ComponentFixture<ItemsgalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsgalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsgalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
