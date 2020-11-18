import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheckoutsummaryPage } from './checkoutsummary.page';

describe('CheckoutsummaryPage', () => {
  let component: CheckoutsummaryPage;
  let fixture: ComponentFixture<CheckoutsummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutsummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutsummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
