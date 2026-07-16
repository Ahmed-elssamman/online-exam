import { Component, signal } from '@angular/core';
import { authData } from '@core/constants/auth-static-page';
import {
  LucideAngularModule,
  LucideIconProvider,
  LUCIDE_ICONS,
  Brain,
  BookOpenCheck,
  RectangleEllipsis,
  FolderCode,
} from 'lucide-angular';

@Component({
  selector: 'app-auth-static-page',
  standalone: true,
  imports: [LucideAngularModule],
  providers: [
    { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider({ Brain, BookOpenCheck, RectangleEllipsis, FolderCode }) },
  ],
  templateUrl: './auth-static-page.html',
  styles: ``,
})
export class AuthStaticPage {

  authData = signal(authData);

}
