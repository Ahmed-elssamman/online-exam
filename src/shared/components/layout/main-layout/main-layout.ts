import { Component, signal } from '@angular/core';
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

  handleAccountAction(action: string) {
    console.log('Sidebar account action clicked:', action);
  }

}
