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
import { NavItemModel } from '@shared/models';
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
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('about', { read: ElementRef }) aboutRef!: ElementRef;
  @ViewChild('home', { read: ElementRef }) homeRef!: ElementRef;

  isLoading = true;
  isPreloaderVisible = true;
  navItems: NavItemModel[] = NAV_ITEMS;
  offsetToNavFixed!: number;
  sectionIds = {
    about: 'about',
    home: 'home',
  };

  private get aboutElement(): HTMLElement {
    return this.aboutRef.nativeElement;
  }

  private get homeElement(): HTMLElement {
    return this.homeRef.nativeElement;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    this.onReadyStateComplete();
    this.screenService.addScreenResizeListener();
  }

  ngAfterViewInit(): void {
    this.observeSectionInterception();
    this.offsetToNavFixed = this.aboutRef?.nativeElement?.offsetTop;
    this.cdr.detectChanges();
  }

  onHidePreloaderAnimationDone(event: AnimationEvent): void {
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
    }
  }

  private observeSectionInterception(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    const observerHome = new IntersectionObserver(
      this.onSectionIntercept(this.sectionIds.home),
      options
    );
    const observerAbout = new IntersectionObserver(
      this.onSectionIntercept(this.sectionIds.about),
      options
    );

    observerHome.observe(this.homeElement);
    observerAbout.observe(this.aboutElement);
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
  ): (entries: any, observer: any) => void {
    return (entries: any, observer: any) => {
      if (entries[0].isIntersecting) {
        this.onChangeNavActive(navLink);
      }
    };
  }

  private scrollTo(element: HTMLElement): void {
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
}
