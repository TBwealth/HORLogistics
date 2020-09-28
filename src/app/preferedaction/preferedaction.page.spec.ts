import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreferedactionPage } from './preferedaction.page';

describe('PreferedactionPage', () => {
  let component: PreferedactionPage;
  let fixture: ComponentFixture<PreferedactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferedactionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreferedactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
