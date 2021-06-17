import { Component } from '@angular/core';
import { WorkCardDialogComponent } from '@shared/components';
import { WORK_ITEMS } from '@shared/fixtures';
import { DialogService } from '@shared/services';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent {
  public WORK_ITEMS = WORK_ITEMS;

  constructor(private dialogService: DialogService) {}

  public onOpenDialog(): void {
    this.dialogService.openDialog(WorkCardDialogComponent);
  }
}
