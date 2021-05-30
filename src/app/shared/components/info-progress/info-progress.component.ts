import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input
} from '@angular/core';
import { InfoProgressModel } from '@shared/models';

@Component({
  selector: 'app-info-progress',
  templateUrl: './info-progress.component.html',
  styleUrls: ['./info-progress.component.scss'],
  animations: [
    trigger('fadeInProgress', [
      state('true', style({ width: '{{ progressEnd }}' }), {
        params: {
          progressEnd: '100%',
        },
      }),
      state('false', style({ width: '0' })),
      transition('false => true', animate('300ms ease-in-out')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoProgressComponent implements AfterViewInit {
  @Input() item!: InfoProgressModel;

  currentTransition = false;
  progressEnd!: number;
  progressStart = 0;

  constructor(private cdr: ChangeDetectorRef, private hostRef: ElementRef) {}

  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((v) => {
        if (v.isIntersecting) {
          this.currentTransition = true;
          this.cdr.markForCheck();

          observer.disconnect();
        }
      });
    }, options);

    observer.observe(this.hostRef.nativeElement);
  }
}
