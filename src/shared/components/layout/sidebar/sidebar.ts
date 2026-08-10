import { Component, ElementRef, HostListener, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarItem, UserAccount } from './sidebar.model';
import { GraduationCap, User, MoreVertical, LayoutDashboard, LogOut, CodeXml, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { SidebarItems } from './sitebar.control';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ GraduationCap, User, MoreVertical, LayoutDashboard, LogOut, CodeXml }),
    },
  ],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {

  items = signal<SidebarItem[]>(SidebarItems);

  // Input user details
  user = input<UserAccount>({
    name: 'Firstname',
    email: 'user-email@example.com',
    avatarUrl: '', // leave empty to demonstrate initials fallback
  });

  accountAction = output<string>();

  isAccountMenuOpen = signal<boolean>(false);

  constructor(private elementRef: ElementRef) { }

  toggleAccountMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isAccountMenuOpen.update((prev) => !prev);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isAccountMenuOpen.set(false);
    }
  }

  handleAction(action: string) {
    this.isAccountMenuOpen.set(false);
    this.accountAction.emit(action);
  }

  get userInitials(): string {
    const u = this.user();
    if (!u) return 'FD';

    if (u.firstName && u.lastName) {
      return `${u.firstName.charAt(0)}${u.lastName.charAt(0)}`.toUpperCase();
    }

    if (u.name) {
      const parts = u.name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
      }
      if (parts[0].length >= 2) {
        return parts[0].substring(0, 2).toUpperCase();
      }
      return parts[0].charAt(0).toUpperCase();
    }

    return 'FD';
  }
}
