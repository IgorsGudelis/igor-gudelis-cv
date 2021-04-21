import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SliderItemBaseModel } from '@shared/models';
import { ScreenService } from '@shared/services';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sliderList') sliderListRef!: ElementRef;

  @Input() itemsCount = 1;
  @Input() itemTmpl!: TemplateRef<HTMLElement>;
  @Input() items!: SliderItemBaseModel[];

  slideWidth!: number;
  private currentPosition = 0;
  private isAnimationEnd = true;
  private minOutsidePosition!: number;
  private sliderAnimationListener!: () => void;

  private get sliderElement(): HTMLElement {
    return this.sliderListRef.nativeElement;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private hostRef: ElementRef,
    private renderer: Renderer2,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    this.onScreenInnerWidthChange();
  }

  ngAfterViewInit(): void {
    this.setInitialValues();
  }

  ngOnDestroy(): void {
    this.sliderAnimationListener();
  }

  onClickPrev(): void {
    if (!this.isAnimationEnd) {
      return;
    }

    this.currentPosition -= 1;
    this.isAnimationEnd = false;

    if (this.currentPosition < 0) {
      this.currentPosition = this.minOutsidePosition - 1;
      this.renderer.addClass(this.sliderElement, '_no-transition');
      this.sliderElement.style.transform = `translateX(-${
        this.currentPosition * this.slideWidth
      }px)`;
      this.currentPosition -= 1;
    }

    setTimeout(() => {
      this.renderer.removeClass(this.sliderElement, '_no-transition');
      this.sliderElement.style.transform = `translateX(-${
        this.currentPosition > 0 ? this.currentPosition * this.slideWidth : 0
      }px)`;
    }, 10);
  }

  onClickNext(): void {
    if (!this.isAnimationEnd) {
      return;
    }

    this.isAnimationEnd = false;

    if (this.currentPosition < this.minOutsidePosition - 1) {
      this.currentPosition += 1;
      this.sliderElement.style.transform = `translateX(-${
        this.currentPosition * this.slideWidth
      }px)`;
    } else {
      this.renderer.addClass(this.sliderElement, '_no-transition');
      this.sliderElement.style.transform = `translateX(0)`;

      setTimeout(() => {
        this.currentPosition = 1;
        this.renderer.removeClass(this.sliderElement, '_no-transition');
        this.sliderElement.style.transform = `translateX(-${
          this.currentPosition * this.slideWidth
        }px)`;
      }, 10);
    }
  }

  private onScreenInnerWidthChange(): void {
    this.screenService.screenInnerWidth$
      .pipe(
        tap(() => {
          this.slideWidth = this.hostRef?.nativeElement.offsetWidth;
          this.cdr.markForCheck();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private setInitialValues(): void {
    this.minOutsidePosition = this.items?.length;
    this.slideWidth = this.hostRef?.nativeElement.offsetWidth;
    this.sliderAnimationListener = this.renderer.listen(
      this.sliderElement,
      'transitionend',
      () => {
        this.isAnimationEnd = true;
      }
    );
    this.cdr.markForCheck();
  }
}
