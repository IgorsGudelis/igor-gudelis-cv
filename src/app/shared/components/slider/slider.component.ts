import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
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
export class SliderComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sliderList') sliderListRef!: ElementRef;

  @Input() itemsOnScreen = 1;
  @Input() itemTmpl!: TemplateRef<HTMLElement>;
  @Input() items: SliderItemBaseModel[] = [];

  currentPosition = 0;
  itemsDefault!: SliderItemBaseModel[];
  slideWidth!: number;
  private isAnimationEnd = true;
  private lastPosition!: number;
  private sliderAnimationListener!: () => void;

  get activeBulletPosition(): number {
    return this.currentPosition !== this.lastPosition ? this.currentPosition : 0;
  }

  private get sliderElement(): HTMLElement {
    return this.sliderListRef.nativeElement;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private hostRef: ElementRef,
    private renderer: Renderer2,
    private screenService: ScreenService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.itemsDefault = changes.items.currentValue;
    }

    this.setSliderItems();
  }

  ngOnInit(): void {
    this.onScreenInnerWidthChange();
  }

  ngAfterViewInit(): void {
    this.setInitialValues();
  }

  ngOnDestroy(): void {
    this.sliderAnimationListener();
  }

  onBulletClick(index: number): void {
    if (!this.isAnimationEnd) {
      return;
    }

    this.currentPosition = index;
    this.isAnimationEnd = false;
    this.sliderTranslateByCurrentPosition();
  }

  onClickPrev(): void {
    if (!this.isAnimationEnd) {
      return;
    }

    this.currentPosition -= 1;
    this.isAnimationEnd = false;

    if (this.currentPosition < 0) {
      this.currentPosition = this.lastPosition;
      this.renderer.addClass(this.sliderElement, '_no-transition');
      this.sliderTranslateByCurrentPosition();
      this.currentPosition -= 1;
    }

    setTimeout(() => {
      this.renderer.removeClass(this.sliderElement, '_no-transition');
      this.sliderElement.style.transform = `translateX(-${
        this.currentPosition > 0 ? this.currentPosition * this.slideWidth : 0
      }px)`;
    }, 50);
  }

  onClickNext(): void {
    if (!this.isAnimationEnd) {
      return;
    }

    this.isAnimationEnd = false;

    if (this.currentPosition < this.lastPosition) {
      this.currentPosition += 1;
      this.sliderTranslateByCurrentPosition();
    } else {
      this.currentPosition = 1;
      this.renderer.addClass(this.sliderElement, '_no-transition');
      this.sliderElement.style.transform = `translateX(0)`;

      setTimeout(() => {
        this.renderer.removeClass(this.sliderElement, '_no-transition');
        this.sliderTranslateByCurrentPosition();
      }, 50);
    }
  }

  private onScreenInnerWidthChange(): void {
    this.screenService.screenInnerWidth$
      .pipe(
        tap(() => {
          this.slideWidth = this.hostRef?.nativeElement.offsetWidth / this.itemsOnScreen;
          this.sliderTranslateByCurrentPosition();
          this.cdr.markForCheck();
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private setInitialValues(): void {
    this.slideWidth = this.hostRef?.nativeElement.offsetWidth / this.itemsOnScreen;
    this.lastPosition =
      this.itemsOnScreen === 1
        ? this.items.length - 1
        : Math.ceil(this.items.length / this.itemsOnScreen);
    this.sliderAnimationListener = this.renderer.listen(
      this.sliderElement,
      'transitionend',
      () => {
        this.isAnimationEnd = true;
      }
    );
    this.cdr.detectChanges();
  }

  private setSliderItems(): void {
    const index =
      this.itemsOnScreen > 1
        ? Math.ceil(this.itemsDefault.length / this.itemsOnScreen)
        : 1;
    const clones = this.itemsDefault.slice(0, index);

    this.items = [];
    this.items = [...this.itemsDefault, ...clones];
  }

  private sliderTranslateByCurrentPosition(): void {
    this.sliderElement.style.transform = `translateX(-${
      this.currentPosition * this.slideWidth
    }px)`;
  }
}
