import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RidershistoryPage } from './ridershistory.page';

describe('RidershistoryPage', () => {
  let component: RidershistoryPage;
  let fixture: ComponentFixture<RidershistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidershistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RidershistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
