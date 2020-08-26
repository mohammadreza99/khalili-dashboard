import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputEditorComponent } from './prime-input-editor.component';

describe('PrimeInputEditorComponent', () => {
  let component: PrimeInputEditorComponent;
  let fixture: ComponentFixture<PrimeInputEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
