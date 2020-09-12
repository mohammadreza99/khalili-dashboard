import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryModifyPage } from './category-modify.page';

describe('CategoryModifyPage', () => {
  let component: CategoryModifyPage;
  let fixture: ComponentFixture<CategoryModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryModifyPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
