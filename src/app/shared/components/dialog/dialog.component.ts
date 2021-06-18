import {
  animate,
  AnimationEvent,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

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
    trigger('dialogContentFadeInOut', [
      transition(
        ':enter',
        [
          style({ opacity: 0, transform: 'scale(0.95)' }),
          animate(
            '{{duration}} 50ms ease-in-out',
            style({ opacity: 1, transform: 'scale(1)' })
          ),
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
          style({ opacity: 1, transform: 'scale(1)' }),
          animate(
            '{{duration}} ease-in-out',
            style({ opacity: 0, transform: 'scale(0.95)' })
          ),
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
export class DialogComponent {
  @Output() closeDialog = new EventEmitter<void>();

  dialogVisibilityState = true;

  onClose(): void {
    this.dialogVisibilityState = false;
  }

  onDialogOpenCloseAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'void') {
      this.closeDialog.emit();
    }
  }
}
