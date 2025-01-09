import { Component, input } from '@angular/core';

type LogoVariant = 'colored' | 'primary' | 'all-black';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  variant = input<LogoVariant>('colored')
}
