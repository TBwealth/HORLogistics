import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocumentuploadPage } from './documentupload.page';

describe('DocumentuploadPage', () => {
  let component: DocumentuploadPage;
  let fixture: ComponentFixture<DocumentuploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentuploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentuploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
