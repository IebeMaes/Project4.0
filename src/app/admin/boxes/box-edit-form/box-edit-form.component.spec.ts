import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxEditFormComponent } from './box-edit-form.component';

describe('BoxEditFormComponent', () => {
  let component: BoxEditFormComponent;
  let fixture: ComponentFixture<BoxEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
