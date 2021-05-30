import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';
import { showBottomToTopAnimation } from '@shared/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [showBottomToTopAnimation],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('homeBg') homeBgElementRef!: ElementRef<HTMLElement>;

  @Input() isHomeContentVisible = false;

  private isIntersecting = false;

  constructor(private hostRef: ElementRef) {}

  @HostListener('window:scroll', ['$event.target.scrollingElement'])
  onScroll(element: HTMLElement): void {
    this.setHomeBgElementTranslate(element);
  }

  ngAfterViewInit(): void {
    this.addIntersectionObserver();
  }

  private addIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((v) => {
        this.isIntersecting = v.isIntersecting;
      });
    }, options);

    observer.observe(this.hostRef.nativeElement);
  }

  private setHomeBgElementTranslate(element: HTMLElement): void {
    if (this.isIntersecting) {
      const offset = element.scrollTop * 0.4;

      this.homeBgElementRef.nativeElement.style.transform = `translate3d(0, ${offset}px, 0)`;
    }
  }
}
