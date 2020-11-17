import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllqueriesPage } from './allqueries.page';

describe('AllqueriesPage', () => {
  let component: AllqueriesPage;
  let fixture: ComponentFixture<AllqueriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllqueriesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllqueriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
