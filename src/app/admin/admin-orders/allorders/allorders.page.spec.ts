import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllordersPage } from './allorders.page';

describe('AllordersPage', () => {
  let component: AllordersPage;
  let fixture: ComponentFixture<AllordersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllordersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllordersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
