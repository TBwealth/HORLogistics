import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultiplePage } from './multiple.page';

describe('MultiplePage', () => {
  let component: MultiplePage;
  let fixture: ComponentFixture<MultiplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiplePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MultiplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
