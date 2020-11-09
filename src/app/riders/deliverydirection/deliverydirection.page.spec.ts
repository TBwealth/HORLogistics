import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeliverydirectionPage } from './deliverydirection.page';

describe('DeliverydirectionPage', () => {
  let component: DeliverydirectionPage;
  let fixture: ComponentFixture<DeliverydirectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverydirectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliverydirectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
