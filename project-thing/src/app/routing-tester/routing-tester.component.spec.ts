import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingTesterComponent } from './routing-tester.component';

describe('RoutingTesterComponent', () => {
  let component: RoutingTesterComponent;
  let fixture: ComponentFixture<RoutingTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
