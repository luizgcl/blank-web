import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';

import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user_info: {
    firstName: string;
    lastName: string;
    email: string;
    role: "SYSADMIN" | "ADMIN" | "EMPLOYEE";
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClientt = inject(HttpClient);
  private router = inject(Router)
  private storage: StorageService<string> = inject(StorageService);

  login(props: LoginProps) {
    return this.httpClientt.post<LoginResponse>(`${environment.url}/auth/login`, props)
      .pipe(
        map(({ access_token, user_info }: LoginResponse) => {
          if (user_info.role === 'SYSADMIN') {
            return 'admin';
          }

          this.storage.setItem('_token', access_token);

          return 'customer';
        }),
      );
  }

  isAuthenticated() {
    if (!this.storage.hasItem('_token')) return false;

    const token = this.storage.getItem('_token')!;

    try {
      const decoded = jwtDecode(token);

      const isExpired = decoded.exp! < Date.now() / 1000;
      return !isExpired;
    } catch {
      return false;
    }
  }

  logout() {
    this.storage.removeItem('_token');
    this.router.navigate(['login']);
  }
}
