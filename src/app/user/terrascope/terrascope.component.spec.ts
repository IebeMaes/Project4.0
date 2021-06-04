import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrascopeComponent } from './terrascope.component';

describe('TerrascopeComponent', () => {
  let component: TerrascopeComponent;
  let fixture: ComponentFixture<TerrascopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerrascopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrascopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
