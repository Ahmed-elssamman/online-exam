import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { AuthLib } from '@ahmed_elssamman/auth-lib';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './main-layout.html',
})
export class MainLayoutComponent {
  private router = inject(Router);
  private authLib = inject(AuthLib);

  handleAccountAction(action: string) {
    if (action === 'account') {
      this.router.navigate(['/account']);
    } else if (action === 'logout') {
      this.authLib.logout();
      this.router.navigate(['/auth/login']);
    }
  }
}
