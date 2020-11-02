import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateprofilepagePage } from './updateprofilepage.page';

describe('UpdateprofilepagePage', () => {
  let component: UpdateprofilepagePage;
  let fixture: ComponentFixture<UpdateprofilepagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateprofilepagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateprofilepagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
