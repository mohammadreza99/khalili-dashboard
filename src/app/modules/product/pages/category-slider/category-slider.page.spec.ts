import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySliderPage } from './category-slider.page';

describe('CategorySliderPage', () => {
  let component: CategorySliderPage;
  let fixture: ComponentFixture<CategorySliderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySliderPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
