import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { SidebarItem } from '../sidebar/sidebar.model';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './main-layout.html',
})
export class MainLayoutComponent {
  sidebarItems: SidebarItem[] = [
    { title: 'Diplomas', icon: 'graduation-cap', path: '/diplomas', isShow: true },
    { title: 'Account Settings', icon: 'user', path: '/account', isShow: true },
  ];

  currentUser = {
    name: 'Firstname',
    email: 'user-email@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
  };

  handleAccountAction(action: string) {
    console.log('Sidebar account action clicked:', action);
  }
}
