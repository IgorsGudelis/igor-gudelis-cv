import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { showHideTopToBottomAnimation } from '@shared/animations';
import { ScreenWidth } from '@shared/enums';
import { ScreenService } from '@shared/services';
import { tap } from 'rxjs/operators';

import { NavItemModel } from '../../models';

@UntilDestroy()
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [showHideTopToBottomAnimation],
})
export class NavigationComponent implements OnInit {
  @Input() navItems: NavItemModel[] = [];
  @Input() offsetToFixed!: number | undefined;
  @Output() navigate = new EventEmitter<string>();

  isNavFixed: boolean | undefined = false;
  isMenuMobileShown = false;
  ScreenWidth = ScreenWidth;

  constructor(
    public screenService: ScreenService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onScreenInnerWidthChange();
  }

  @HostListener('window:scroll', ['$event.target'])
  onScroll(doc: Document): void {
    const scrollTop = doc?.scrollingElement?.scrollTop;

    if (this.offsetToFixed === undefined || scrollTop === undefined) {
      return;
    }

    this.isNavFixed =
      this.screenService.screen !== ScreenWidth.MOBILE &&
      scrollTop >= this.offsetToFixed;
  }

  onNavClick(link: string): void {
    this.navigate.emit(link);
  }

  onToggleMenuMobile(): void {
    this.isMenuMobileShown = !this.isMenuMobileShown;
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
