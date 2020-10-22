import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtpvalidationPage } from './otpvalidation.page';

describe('OtpvalidationPage', () => {
  let component: OtpvalidationPage;
  let fixture: ComponentFixture<OtpvalidationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpvalidationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpvalidationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
