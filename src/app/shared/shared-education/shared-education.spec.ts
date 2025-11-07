import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedEducation } from './shared-education';

describe('SharedEducation', () => {
  let component: SharedEducation;
  let fixture: ComponentFixture<SharedEducation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedEducation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedEducation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
