import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyQuestionarriesComponent } from './property-questionarries.component';

describe('PropertyQuestionarriesComponent', () => {
  let component: PropertyQuestionarriesComponent;
  let fixture: ComponentFixture<PropertyQuestionarriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyQuestionarriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyQuestionarriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
