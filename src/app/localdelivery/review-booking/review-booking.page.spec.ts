import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewBookingPage } from './review-booking.page';

describe('ReviewBookingPage', () => {
  let component: ReviewBookingPage;
  let fixture: ComponentFixture<ReviewBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
