import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  constructor() {}
  iconMenu: IMenuItem[] = [
    {
      name: 'HOME',
      type: 'icon',
      tooltip: 'HOME',
      icon: 'home',
      state: '/'
    },
    {
      name: 'REWARDS',
      type: 'topbar-links',
      tooltip: 'REWARDS',
      icon: 'person',
      state: 'dashboard/rewards'
    },
    {
      name: 'PROFILE',
      type: 'icon',
      tooltip: 'PROFILE',
      icon: 'person',
      state: 'dashboard/edit_profile'
    },
    {
      name: 'MY_ACCOUNT',
      type: 'link',
      tooltip: 'MY_ACCOUNT',
      icon: 'account_circle',
      state: 'dashboard/profile',
    },
    {
      name: "ORDERS",
      type: 'topbar-links',
      tooltip: 'ORDERS',
      state: "dashboard/orders/requests"
    }
  ];

  separatorMenu: IMenuItem[] = [];

  plainMenu: IMenuItem[] = [];

  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case 'separator-menu':
        this.menuItems.next(this.separatorMenu);
        break;
      case 'icon-menu':
        this.menuItems.next(this.iconMenu);
        break;
      default:
        this.menuItems.next(this.plainMenu);
    }
  }
}
