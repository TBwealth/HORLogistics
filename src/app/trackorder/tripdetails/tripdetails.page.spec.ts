import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TripdetailsPage } from './tripdetails.page';

describe('TripdetailsPage', () => {
  let component: TripdetailsPage;
  let fixture: ComponentFixture<TripdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TripdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
