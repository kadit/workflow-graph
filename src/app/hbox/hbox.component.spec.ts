import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HboxComponent } from './hbox.component';

describe('HboxComponent', () => {
  let component: HboxComponent;
  let fixture: ComponentFixture<HboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
