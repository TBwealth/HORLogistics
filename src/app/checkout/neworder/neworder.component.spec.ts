import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NeworderComponent } from './neworder.component';

describe('NeworderComponent', () => {
  let component: NeworderComponent;
  let fixture: ComponentFixture<NeworderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeworderComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NeworderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
