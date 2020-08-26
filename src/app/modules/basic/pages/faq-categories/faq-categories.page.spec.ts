import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCategoriesPage } from './faq-categories.page';

describe('FaqCategoriesPage', () => {
  let component: FaqCategoriesPage;
  let fixture: ComponentFixture<FaqCategoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqCategoriesPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCategoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
