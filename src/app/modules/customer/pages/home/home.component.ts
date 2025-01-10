import { AuthService } from '@/app/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-home',
  imports: [Avatar, TabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authService = inject(AuthService)

  userProfile = this.authService.getProfile();
}
