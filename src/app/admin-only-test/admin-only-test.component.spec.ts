import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOnlyTestComponent } from './admin-only-test.component';

describe('AdminOnlyTestComponent', () => {
  let component: AdminOnlyTestComponent;
  let fixture: ComponentFixture<AdminOnlyTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOnlyTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOnlyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
