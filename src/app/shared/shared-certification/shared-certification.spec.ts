import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCertification } from './shared-certification';

describe('SharedCertification', () => {
  let component: SharedCertification;
  let fixture: ComponentFixture<SharedCertification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedCertification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedCertification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
