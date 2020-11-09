import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiderroutePage } from './riderroute.page';

describe('RiderroutePage', () => {
  let component: RiderroutePage;
  let fixture: ComponentFixture<RiderroutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderroutePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiderroutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
