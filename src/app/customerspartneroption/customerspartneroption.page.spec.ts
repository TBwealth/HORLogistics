import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerspartneroptionPage } from './customerspartneroption.page';

describe('CustomerspartneroptionPage', () => {
  let component: CustomerspartneroptionPage;
  let fixture: ComponentFixture<CustomerspartneroptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerspartneroptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerspartneroptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
