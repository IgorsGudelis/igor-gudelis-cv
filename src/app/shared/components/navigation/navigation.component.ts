import { Component, OnInit } from '@angular/core';

import { NAV_ITEMS } from '../../constants';
import { NavItemModel } from '../../models';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  navItems: NavItemModel[] = NAV_ITEMS;

  constructor() {}

  ngOnInit(): void {}
}
