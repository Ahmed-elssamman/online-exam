# 🔐 @ahmed_elssamman/auth-lib

<div align="center">

[![Angular Version](https://img.shields.io/badge/Angular-21.2.0+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8+-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev)

**⚡ A modern, lightweight, and signal-ready Angular 21 Authentication Library**  
Designed for robust enterprise login, registration workflows, OTP email verification, password resets, and flexible data adaptation.

[Features](#-key-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [API Reference](#-api-reference) • [Configuration](#-configuration)

</div>

---

## ✨ Key Features

- 🔑 **Complete Auth Lifecycle**: Out-of-the-box support for Login, Register, Password Reset, and OTP Verification.
- 📩 **OTP Email Verification**: Built-in 2-step email verification workflow.
- 🔄 **Data Adaptation**: Integrated `AuthAdapterService` to transform raw backend HTTP responses into standardized client models.
- ⚡ **Angular 21 & Signals Ready**: Built for modern Angular standalone components and Signal Forms.
- 🎯 **Custom Endpoint Overrides**: Pass custom backend endpoints on a per-method basis without changing global config.
- 🛡️ **Type-Safe Interfaces**: Fully typed request and response payloads with strict TypeScript definitions.

---

## 📦 Installation

Install the package via **npm**:

```bash
npm install @ahmed_elssamman/auth-lib
```

---

## 🚀 Quick Start

### 1. Provide API Configuration

In your `app.config.ts` or main application providers, register the `API_CONFIG` provider:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { API_CONFIG } from '@ahmed_elssamman/auth-lib';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: 'https://api.yourdomain.com/api/v1',
        clientName: 'Name-App',
      },
    },
  ],
};
```

---

### 2. Inject and Use `AuthLib`

Inject `AuthLib` into your component or feature service:

```typescript
import { Component, inject } from '@angular/core';
import { AuthLib, IAuthLoginRequest } from '@ahmed_elssamman/auth-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authLib = inject(AuthLib);
  private readonly router = inject(Router);

  onLogin(credentials: IAuthLoginRequest): void {
    this.authLib.login(credentials).subscribe({
      next: (adaptedResponse) => {
        console.log('Login Successful:', adaptedResponse.token, adaptedResponse.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => console.error('Login Failed:', err),
    });
  }
}
```

---

## 📚 API Reference

### `AuthLib` Methods

| Method | Parameters | Description | Returns |
| :--- | :--- | :--- | :--- |
| `login` | `userData: IAuthLoginRequest`, `customEndpoint?: string` | Authenticates user credentials and adapts token & user data. | `Observable<IAuthAdaptedResponse>` |
| `register` | `userData: Partial<IAuthRegisterInterface>`, `customEndpoint?: string` | Registers a new user account. | `Observable<IAuthAdaptedResponse>` |
| `sendEmailForVerification` | `email: string`, `customEndpoint?: string` | Triggers an OTP verification email to the user. | `Observable<any>` |
| `verifyEmail` | `userData: { email: string; code: string }`, `customEndpoint?: string` | Validates the OTP code received via email. | `Observable<any>` |
| `forgotPassword` | `userData: { email: string; redirectUrl?: string }`, `customEndpoint?: string` | Initiates password recovery process. | `Observable<any>` |
| `resetPassword` | `userData: { token: string; newPassword: string; confirmPassword: string }`, `customEndpoint?: string` | Sets a new password using reset token. | `Observable<any>` |

---

## 🛠️ Advanced Customization

> [!TIP]
> **Overriding Endpoints Dynamically**  
> If your API has custom routes for specific features (e.g. `/v2/auth/quick-login`), you can pass a custom endpoint string directly to any method call:

```typescript
this.authLib.login(credentials, '/v2/auth/quick-login').subscribe(...);
```

> [!NOTE]
> **Data Adapter pattern**  
> By default, `login()` and `register()` pipe response data through `AuthAdapterService`. This normalizes user objects, status codes, and JWT tokens across varying backend API response shapes.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  Crafted with ❤️ by <b>Ahmed El-Samman</b>
</div>
