import { Component, OnInit } from '@angular/core';
import { WorkCardDialogComponent } from '@shared/components';
import { DialogService } from '@shared/services';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit {
  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {}

  public onOpenDialog(): void {
    this.dialogService.openDialog(WorkCardDialogComponent);
  }
}
