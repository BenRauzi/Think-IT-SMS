import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsEditTestComponent } from './student-details-edit-test.component';

describe('StudentDetailsEditTestComponent', () => {
  let component: StudentDetailsEditTestComponent;
  let fixture: ComponentFixture<StudentDetailsEditTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDetailsEditTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailsEditTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
