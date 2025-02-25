import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

type LogoVariant = 'colored' | 'primary' | 'all-black';

@Component({
  selector: 'app-logo',
  imports: [RouterModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  variant = input<LogoVariant>('colored');
}
