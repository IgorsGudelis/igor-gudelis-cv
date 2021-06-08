import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@shared/shared.testing.module';

import { InfoSocialComponent } from './info-social.component';

describe('InfoSocialComponent', () => {
  let component: InfoSocialComponent;
  let fixture: ComponentFixture<InfoSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(SharedTestingModule).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
