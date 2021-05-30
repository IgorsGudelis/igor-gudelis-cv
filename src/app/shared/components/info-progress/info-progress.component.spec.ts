import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@shared/shared.testing.module';

import { InfoProgressComponent } from './info-progress.component';

describe('InfoProgressComponent', () => {
  let component: InfoProgressComponent;
  let fixture: ComponentFixture<InfoProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(SharedTestingModule).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
