import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ScreenWidth } from '@shared/enums';
import { ScreenService } from '@shared/services';

import { NAV_ITEMS } from '../../constants';
import { NavItemModel } from '../../models';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('navMobileShowHide', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('250ms ease-out', style({ transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class NavigationComponent {
  isMenuMobileShown = false;
  navItems: NavItemModel[] = NAV_ITEMS;
  ScreenWidth = ScreenWidth;

  constructor(public screenService: ScreenService) {}

  onToggleMenuMobile(): void {
    this.isMenuMobileShown = !this.isMenuMobileShown;
  }
}
