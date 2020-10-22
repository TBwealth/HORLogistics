import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProvidephonePage } from './providephone.page';

describe('ProvidephonePage', () => {
  let component: ProvidephonePage;
  let fixture: ComponentFixture<ProvidephonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidephonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProvidephonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
