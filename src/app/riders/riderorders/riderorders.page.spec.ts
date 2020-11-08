import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RiderordersPage } from './riderorders.page';

describe('RiderordersPage', () => {
  let component: RiderordersPage;
  let fixture: ComponentFixture<RiderordersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderordersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RiderordersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
