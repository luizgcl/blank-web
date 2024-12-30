import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { LogoComponent } from "../../components/logo/logo.component";

@Component({
  selector: 'app-login',
  imports: [FloatLabel, ButtonModule, InputTextModule, Password, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
