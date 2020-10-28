import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShipmentoptionsPage } from './shipmentoptions.page';

describe('ShipmentoptionsPage', () => {
  let component: ShipmentoptionsPage;
  let fixture: ComponentFixture<ShipmentoptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentoptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentoptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
