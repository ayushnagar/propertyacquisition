import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPreviewDetailsComponent } from './property-preview-details.component';

describe('PropertyPreviewDetailsComponent', () => {
  let component: PropertyPreviewDetailsComponent;
  let fixture: ComponentFixture<PropertyPreviewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyPreviewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPreviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
