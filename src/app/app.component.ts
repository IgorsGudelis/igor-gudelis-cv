import {
  animate,
  AnimationEvent,
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
  OnInit,
  ViewChild
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NAV_ITEMS } from '@shared/constants';
import { ScreenWidth } from '@shared/enums';
import { NavItemModel } from '@shared/models';
import { ScreenService } from '@shared/services';
import jump from 'jump.js';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('hidePreloaderOverlay', [
      transition(':leave', [animate('800ms 450ms ease-in-out', style({ opacity: 0 }))]),
    ]),
    trigger('hidePreloaderCircle', [
      transition(':leave', [animate('450ms ease-in-out', style({ opacity: 0 }))]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('about', { read: ElementRef }) aboutRef!: ElementRef;
  @ViewChild('home', { read: ElementRef }) homeRef!: ElementRef;
  @ViewChild('resume', { read: ElementRef }) resumeRef!: ElementRef;
  @ViewChild('testimonials', { read: ElementRef }) testimonialsRef!: ElementRef;

  isLoading = true;
  isPreloaderVisible = true;
  navItems: NavItemModel[] = NAV_ITEMS;
  offsetToNavFixed!: number;
  sectionIds = {
    about: 'about',
    home: 'home',
    resume: 'resume',
    testimonials: 'testimonials',
  };

  private get aboutElement(): HTMLElement {
    return this.aboutRef.nativeElement;
  }

  private get homeElement(): HTMLElement {
    return this.homeRef.nativeElement;
  }

  private get resumeElement(): HTMLElement {
    return this.resumeRef.nativeElement;
  }

  private get testimonialsElement(): HTMLElement {
    return this.testimonialsRef.nativeElement;
  }

  constructor(private cdr: ChangeDetectorRef, private screenService: ScreenService) {}

  ngOnInit(): void {
    this.onReadyStateComplete();
    this.screenService.addScreenResizeListener();
  }

  ngAfterViewInit(): void {
    this.observeSectionInterception();
    this.offsetToNavFixed = this.aboutElement?.offsetTop;
    this.cdr.detectChanges();
  }

  onHidePreloaderOverlayAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'void') {
      this.isPreloaderVisible = false;
      this.cdr.markForCheck();
    }
  }

  onNavigate(link: string): void {
    switch (link) {
      case this.sectionIds.home: {
        this.scrollTo(this.homeElement);
        break;
      }

      case this.sectionIds.about: {
        this.scrollTo(this.aboutElement);
        break;
      }

      case this.sectionIds.resume: {
        this.scrollTo(this.resumeElement);
        break;
      }

      case this.sectionIds.testimonials: {
        this.scrollTo(this.testimonialsElement);
        break;
      }
    }
  }

  onScrollToTop(): void {
    this.scrollTo(this.homeElement);
  }

  private observeSectionInterception(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: this.screenService.screen === ScreenWidth.MOBILE ? 0.15 : 0.3,
    };
    const observerHome = new IntersectionObserver(
      this.onSectionIntercept(this.sectionIds.home),
      options
    );
    const observerAbout = new IntersectionObserver(
      this.onSectionIntercept(this.sectionIds.about),
      options
    );
    const observerResume = new IntersectionObserver(
      this.onSectionIntercept(this.sectionIds.resume),
      options
    );
    const observerTestimonials = new IntersectionObserver(
      this.onSectionIntercept(this.sectionIds.testimonials),
      options
    );

    observerHome.observe(this.homeElement);
    observerAbout.observe(this.aboutElement);
    observerResume.observe(this.resumeElement);
    observerTestimonials.observe(this.testimonialsElement);
  }

  private onChangeNavActive(navLink: string): void {
    this.navItems = this.navItems.map((item) => ({
      ...item,
      isActive: item.link === navLink,
    }));
    this.cdr.markForCheck();
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

  private onSectionIntercept(
    navLink: string
  ): (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void {
    return (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries[0].isIntersecting) {
        this.onChangeNavActive(navLink);
      }
    };
  }

  private scrollTo(element: HTMLElement): void {
    jump(element, {
      duration: 1200,
    });
  }
}
