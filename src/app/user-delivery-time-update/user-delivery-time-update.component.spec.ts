import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeliveryTimeUpdateComponent } from './user-delivery-time-update.component';

describe('UserDeliveryTimeUpdateComponent', () => {
  let component: UserDeliveryTimeUpdateComponent;
  let fixture: ComponentFixture<UserDeliveryTimeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDeliveryTimeUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeliveryTimeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
