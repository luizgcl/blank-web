import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

interface LoginProps {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClientt = inject(HttpClient);

  login(props: LoginProps) {
    return this.httpClientt.post(`${environment.url}/auth/login`, props);
  }
}
