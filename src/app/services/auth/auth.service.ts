import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

interface LoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user_role: "SYSADMIN" | "ADMIN" | "EMPLOYEE";
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClientt = inject(HttpClient);

  login(props: LoginProps) {
    return this.httpClientt.post<LoginResponse>(`${environment.url}/auth/login`, props)
      .pipe(
        map((response: LoginResponse) => {
          if (response.user_role === 'SYSADMIN') {
            return 'admin';
          }

          return 'customer';
        }),
      );
  }
}
