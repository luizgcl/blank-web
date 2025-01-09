import { Component, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { UserProfileInfo } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-profile-header',
  imports: [AvatarModule, MenuModule, ButtonModule],
  templateUrl: './user-profile-header.component.html',
  styleUrl: './user-profile-header.component.scss'
})
export class UserProfileHeaderComponent {
  profile = input.required<UserProfileInfo>();
}
