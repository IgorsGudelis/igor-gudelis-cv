import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@shared/shared.testing.module';

import { WorkCardDialogComponent } from './work-card-dialog.component';

describe('WorkCardDialogComponent', () => {
  let component: WorkCardDialogComponent;
  let fixture: ComponentFixture<WorkCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(SharedTestingModule).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
