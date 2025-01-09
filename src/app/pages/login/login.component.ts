import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { LogoComponent } from '../../components/logo/logo.component';
import { AuthService } from '../../services/auth/auth.service';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [
    FloatLabel,
    ButtonModule,
    InputTextModule,
    Password,
    LogoComponent,
    FormsModule,
    ReactiveFormsModule,
    Toast,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  router = inject(Router)

  messageService = inject(MessageService);

  form: FormGroup = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  handleLogin() {
    if (this.form.invalid) return;

    this.authService.login(this.form.value)
      .subscribe({
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
