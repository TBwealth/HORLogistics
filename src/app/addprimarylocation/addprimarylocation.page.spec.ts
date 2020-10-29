import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddprimarylocationPage } from './addprimarylocation.page';

describe('AddprimarylocationPage', () => {
  let component: AddprimarylocationPage;
  let fixture: ComponentFixture<AddprimarylocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprimarylocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddprimarylocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
