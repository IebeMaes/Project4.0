import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmainComponent } from './detailmain.component';

describe('DetailmainComponent', () => {
  let component: DetailmainComponent;
  let fixture: ComponentFixture<DetailmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
