import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleImagePickerComponent } from './single-image-picker.component';

describe('SingleImagePickerComponent', () => {
  let component: SingleImagePickerComponent;
  let fixture: ComponentFixture<SingleImagePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleImagePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleImagePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
