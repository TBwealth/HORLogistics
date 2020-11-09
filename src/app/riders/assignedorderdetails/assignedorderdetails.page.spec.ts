import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignedorderdetailsPage } from './assignedorderdetails.page';

describe('AssignedorderdetailsPage', () => {
  let component: AssignedorderdetailsPage;
  let fixture: ComponentFixture<AssignedorderdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedorderdetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignedorderdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
