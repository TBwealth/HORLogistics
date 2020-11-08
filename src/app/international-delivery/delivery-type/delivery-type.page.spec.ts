import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeliveryTypePage } from './delivery-type.page';

describe('DeliveryTypePage', () => {
  let component: DeliveryTypePage;
  let fixture: ComponentFixture<DeliveryTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
