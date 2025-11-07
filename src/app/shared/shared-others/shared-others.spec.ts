import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedOthers } from './shared-others';

describe('SharedOthers', () => {
  let component: SharedOthers;
  let fixture: ComponentFixture<SharedOthers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedOthers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedOthers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
