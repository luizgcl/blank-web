import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';

import { UserInfo } from '@/core/models/user-info';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  userInfo: UserInfo;
}

interface RegisterProps {
  name: string;
  firstName: string;
  lastName: string;
  document: string;
  documentType: string;
  email: string;
  phone: string;
  planId: number;
  installments: number;
  planDiscount: number;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private storage = inject(StorageService);

  login(props: LoginProps) {
    return this.httpClient
      .post<LoginResponse>(`${environment.url}/auth/login`, props)
      .pipe(
        map(({ access_token, userInfo }: LoginResponse) => {
          if (userInfo.role === 'SYSADMIN') {
            return 'admin';
          }

          this.storage.setItem('_token', access_token);
          this.storage.setItem('_profile', userInfo);

          return 'customer';
        })
      );
  }

  register(props: RegisterProps) {
    return this.httpClient.post(`${environment.url}/auth/register`, props);
  }

  isAuthenticated() {
    if (!this.storage.hasItem('_token')) return false;

    const token = this.storage.getItem<string>('_token')!;

    try {
      const decoded = jwtDecode(token);

      const isExpired = decoded.exp! < Math.floor(Date.now() / 1000);
      return !isExpired;
    } catch {
      return false;
    }
  }

  getProfile(): UserInfo | null {
    return this.storage.getItem<UserInfo>('_profile');
  }

  logout() {
    this.storage.clear();
    this.router.navigate(['login']);
  }
}
