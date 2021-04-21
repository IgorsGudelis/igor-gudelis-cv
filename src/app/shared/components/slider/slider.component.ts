import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sliderList') sliderListRef!: ElementRef;

  @Input() itemsAmount!: number;

  private currentPosition = 0;
  private isAnimationEnd = true;
  private minOutsidePosition = 4;
  private slideWidth = 300;
  private sliderAnimationListener!: () => void;

  private get sliderElement(): HTMLElement {
    return this.sliderListRef.nativeElement;
  }

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.sliderAnimationListener = this.renderer.listen(
      this.sliderElement,
      'transitionend',
      () => {
        this.isAnimationEnd = true;
      }
    );
  }

  ngOnDestroy(): void {
    this.sliderAnimationListener && this.sliderAnimationListener();
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
}
