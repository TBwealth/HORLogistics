import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocaldeliveryPage } from './localdelivery.page';

describe('LocaldeliveryPage', () => {
  let component: LocaldeliveryPage;
  let fixture: ComponentFixture<LocaldeliveryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaldeliveryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocaldeliveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
