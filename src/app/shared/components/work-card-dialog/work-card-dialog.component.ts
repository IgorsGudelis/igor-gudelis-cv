import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogInstanceModel } from '@shared/models/dialogInstance.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-work-card-dialog',
  templateUrl: './work-card-dialog.component.html',
  styleUrls: ['./work-card-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkCardDialogComponent implements DialogInstanceModel {
  afterClose$ = new Subject<void>();

  public onClose(): void {
    this.afterClose$.next();
  }
}
