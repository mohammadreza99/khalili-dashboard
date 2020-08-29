import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSettingPage } from './main-setting.page';

describe('MainSettingPage', () => {
  let component: MainSettingPage;
  let fixture: ComponentFixture<MainSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSettingPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
