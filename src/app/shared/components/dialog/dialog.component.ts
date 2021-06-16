import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from '@angular/core';
import { DialogInstanceModel } from '@shared/models/dialogInstance.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('dialogOpenClose', [
      transition(
        ':enter',
        [
          style({ opacity: 0 }),
          animate('{{duration}} ease-in-out', style({ opacity: 1 })),
        ],
        {
          params: {
            duration: '300ms',
          },
        }
      ),
      transition(
        ':leave',
        [
          style({ opacity: 1 }),
          animate('{{duration}} ease-in-out', style({ opacity: 0 })),
        ],
        {
          params: {
            duration: '300ms',
          },
        }
      ),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements DialogInstanceModel {
  @Input() data!: any;

  @HostBinding('@dialogOpenClose') dialogVisibilityState = true;

  afterClose$ = new Subject<any>();

  onClose(): void {
    this.dialogVisibilityState = false;
    this.afterClose$.next(this.data);
  }
}
