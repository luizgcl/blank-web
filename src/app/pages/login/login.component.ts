import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LogoComponent } from '../../components/logo/logo.component';
import { AuthService } from '../../services/auth/auth.service';

import { PrimeModule } from '@/app/shared/prime/prime.module';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    LogoComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);

  messageService = inject(MessageService);

  form: FormGroup = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  handleLogin() {
    if (this.form.invalid) return;

    this.authService.login(this.form.value).subscribe({
      next: (modulePath) => {
        this.router.navigate([modulePath, 'home']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Não foi possível se autenticar',
          detail: 'Credênciais inválidas',
          life: 3000,
        });
      },
    });
  }
}
