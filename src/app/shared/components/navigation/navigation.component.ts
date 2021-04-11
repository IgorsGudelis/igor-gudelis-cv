import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { showHideTopToBottomAnimation } from '@shared/animations';
import { ScreenWidth } from '@shared/enums';
import { ScreenService } from '@shared/services';
import { tap } from 'rxjs/operators';

import { NAV_ITEMS } from '../../constants';
import { NavItemModel } from '../../models';

@UntilDestroy()
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [showHideTopToBottomAnimation],
})
export class NavigationComponent implements OnInit {
  isMenuMobileShown = false;
  navItems: NavItemModel[] = NAV_ITEMS;
  ScreenWidth = ScreenWidth;

  constructor(
    public screenService: ScreenService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.onScreenInnerWidthChange();
  }

  onToggleMenuMobile(): void {
    this.isMenuMobileShown = !this.isMenuMobileShown;
  }

  private onScreenInnerWidthChange(): void {
    this.screenService.screenInnerWidth$
      .pipe(tap(() => this.cdr.markForCheck()))
      .subscribe();
  }
}
