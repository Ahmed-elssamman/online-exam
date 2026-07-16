import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStaticPage } from '@shared/components/business-ui/auth-static-page/auth-static-page';

@Component({
  selector: 'app-auth',
  standalone:true,
  imports: [RouterOutlet,AuthStaticPage],
  templateUrl: './auth.html',
})
export class Auth {}
