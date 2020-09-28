import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginsigninoptionsPage } from './loginsigninoptions.page';

describe('LoginsigninoptionsPage', () => {
  let component: LoginsigninoptionsPage;
  let fixture: ComponentFixture<LoginsigninoptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginsigninoptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginsigninoptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
