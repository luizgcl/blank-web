import { UserInfo } from '@/core/models/user-info';
import { Component, input, output } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-toolbar',
  imports: [Toolbar, ButtonModule, DrawerModule, Avatar, InputTextModule, IconField, InputIcon],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  profile = input.required<UserInfo>();

  openMenu = output()
  openProfile = output()
}
