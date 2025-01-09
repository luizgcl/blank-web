import { Component, inject } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Toolbar } from 'primeng/toolbar';
import { UserProfileHeaderComponent } from "../../../../components/user-profile-header/user-profile-header.component";
import { UserProfileComponent } from "../../../../components/user-profile/user-profile.component";
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [Toolbar, Divider, ButtonModule, DrawerModule, Avatar, InputTextModule, IconField, InputIcon, UserProfileComponent, UserProfileHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authService = inject(AuthService);

  userProfile = this.authService.getProfile();

  visible = false;
  profileVisible = false;
}
