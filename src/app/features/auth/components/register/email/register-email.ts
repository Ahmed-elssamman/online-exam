import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteBtn } from '@shared/components/ui/site-btn/site-btn';

@Component({
  selector: 'app-register-email',
  standalone: true,
  imports: [RouterLink, SiteBtn],
  templateUrl: './register-email.html',
})
export class RegisterEmail {}
