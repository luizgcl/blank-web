import { UserInfo } from '@/core/models/user-info';
import { Component, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-user-profile-header',
  imports: [AvatarModule, MenuModule, ButtonModule],
  templateUrl: './user-profile-header.component.html',
  styleUrl: './user-profile-header.component.scss'
})
export class UserProfileHeaderComponent {
  profile = input.required<UserInfo>();
}
