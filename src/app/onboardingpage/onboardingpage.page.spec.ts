import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnboardingpagePage } from './onboardingpage.page';

describe('OnboardingpagePage', () => {
  let component: OnboardingpagePage;
  let fixture: ComponentFixture<OnboardingpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
