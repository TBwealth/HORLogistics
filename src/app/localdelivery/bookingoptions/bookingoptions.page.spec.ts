import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingoptionsPage } from './bookingoptions.page';

describe('BookingoptionsPage', () => {
  let component: BookingoptionsPage;
  let fixture: ComponentFixture<BookingoptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingoptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingoptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
