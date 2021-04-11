import {
  animate,
  AnimationEvent,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScreenService } from '@shared/services';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('hidePreloader', [
      transition(':leave', [
        animate('800ms 450ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
    trigger('hidePreloaderCircle', [
      transition(':leave', [
        animate('450ms ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isLoading = true;
  isPreloaderVisible = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    this.onReadyStateComplete();
    this.screenService.addScreenResizeListener();
  }

  onHidePreloaderAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'void') {
      this.isPreloaderVisible = false;
      this.cdr.markForCheck();
    }
  }

  private onReadyStateComplete(): void {
    this.screenService
      .onReadyStateComplete()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
      });
  }
}
