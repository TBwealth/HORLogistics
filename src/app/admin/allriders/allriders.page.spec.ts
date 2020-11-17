import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllridersPage } from './allriders.page';

describe('AllridersPage', () => {
  let component: AllridersPage;
  let fixture: ComponentFixture<AllridersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllridersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllridersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
