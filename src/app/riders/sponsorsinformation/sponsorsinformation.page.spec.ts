import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SponsorsinformationPage } from './sponsorsinformation.page';

describe('SponsorsinformationPage', () => {
  let component: SponsorsinformationPage;
  let fixture: ComponentFixture<SponsorsinformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorsinformationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorsinformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
