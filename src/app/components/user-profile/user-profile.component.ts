import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-user-profile',
  imports: [AvatarModule, MenuModule, ButtonModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  logout = output();

  items: MenuItem[] = [
    {
      label: 'Perfil',
      items: [
        { label: 'Minha Conta', icon: 'pi pi-user' },
        { label: 'Alterar Senha', icon: 'pi pi-lock' },
      ]
    }
  ];
}
