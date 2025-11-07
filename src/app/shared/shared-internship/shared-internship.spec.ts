import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedInternship } from './shared-internship';

describe('SharedInternship', () => {
  let component: SharedInternship;
  let fixture: ComponentFixture<SharedInternship>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedInternship]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedInternship);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
