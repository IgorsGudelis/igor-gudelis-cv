import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WorkItemModel } from '@shared/models';
import { DialogInstanceModel } from '@shared/models/dialogInstance.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-work-card-dialog',
  templateUrl: './work-card-dialog.component.html',
  styleUrls: ['./work-card-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkCardDialogComponent implements DialogInstanceModel {
  @Input() item!: WorkItemModel;

  afterClose$ = new Subject<void>();

  public onClose(): void {
    this.afterClose$.next();
  }
}
