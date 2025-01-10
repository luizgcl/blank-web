import { UserProfileHeaderComponent } from '@/app/components/user-profile-header/user-profile-header.component';
import { UserProfileComponent } from '@/app/components/user-profile/user-profile.component';
import { AuthService } from '@/app/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Divider } from 'primeng/divider';
import { Drawer } from 'primeng/drawer';
import { MenuComponent } from './components/menu/menu.component';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";

@Component({
  selector: 'app-customer',
  imports: [RouterModule, MenuComponent, Drawer, Divider, UserProfileHeaderComponent, UserProfileComponent, ToolbarComponent],
  template: `
    <app-toolbar
      [profile]="userProfile!"
      (openMenu)="menuVisilbe = true"
      (openProfile)="profileVisible = true"
    />
    <p-drawer [(visible)]="menuVisilbe" header="Menu" styleClass="w-full md:w-1/4 2xl:w-1/6">
        <app-menu/>
    </p-drawer>
    <p-drawer 
        [(visible)]="profileVisible" 
        position="right"
        closable="false"
        styleClass="w-full md:w-1/4 2xl:w-1/6">
        <ng-template #header>
            <app-user-profile-header
                [profile]="userProfile!"
            />
        </ng-template>
        <p-divider/>
        <app-user-profile 
            (logout)="authService.logout()"
        />
    </p-drawer>
    <router-outlet />
  `,
})
export class CustomerComponent {
  authService = inject(AuthService)

  userProfile = this.authService.getProfile();

  menuVisilbe = false
  profileVisible = false
}
