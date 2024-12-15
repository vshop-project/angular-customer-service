import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryStatusNotificationComponent } from './delivery-status-notification.component';

describe('DeliveryStatusNotificationComponent', () => {
  let component: DeliveryStatusNotificationComponent;
  let fixture: ComponentFixture<DeliveryStatusNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryStatusNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryStatusNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
