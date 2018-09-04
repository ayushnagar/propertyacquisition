import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRerc1FeedbackComponent } from './property-rerc1-feedback.component';

describe('PropertyRerc1FeedbackComponent', () => {
  let component: PropertyRerc1FeedbackComponent;
  let fixture: ComponentFixture<PropertyRerc1FeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyRerc1FeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyRerc1FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
