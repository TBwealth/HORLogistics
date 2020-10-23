import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleorderPage } from './singleorder.page';

describe('SingleorderPage', () => {
  let component: SingleorderPage;
  let fixture: ComponentFixture<SingleorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleorderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
