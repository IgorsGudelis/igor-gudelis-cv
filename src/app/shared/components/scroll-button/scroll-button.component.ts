import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fadeInOutAnimation } from '@shared/animations';
import { ScreenWidth } from '@shared/enums';
import { ScreenService } from '@shared/services';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-scroll-button',
  templateUrl: './scroll-button.component.html',
  styleUrls: ['./scroll-button.component.scss'],
  animations: [fadeInOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollButtonComponent implements OnInit {
  @Input() offset = 0;
  @Output() scrolling = new EventEmitter<void>();

  currentTransition = ':leave';
  isScrollBtnVisible = false;
  ScreenWidth = ScreenWidth;

  constructor(
    public screenService: ScreenService,
    private cdr: ChangeDetectorRef,
    private viewPortScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.onScreenInnerWidthChange();
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollOffset = this.viewPortScroller.getScrollPosition()[1];

    this.isScrollBtnVisible = scrollOffset >= this.offset;
    this.currentTransition = this.isScrollBtnVisible ? ':enter' : ':leave';
  }

  onScrollTo(): void {
    this.scrolling.emit();
  }

  private onScreenInnerWidthChange(): void {
    this.screenService.screenInnerWidth$
      .pipe(
        tap(() => this.cdr.markForCheck()),
        untilDestroyed(this)
      )
      .subscribe();
  }
}
