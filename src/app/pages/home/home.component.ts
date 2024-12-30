import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MegaMenu } from 'primeng/megamenu';
import { LogoComponent } from "../../components/logo/logo.component";

@Component({
  selector: 'app-home',
  imports: [RouterModule, MegaMenu, ButtonModule, CommonModule, AvatarModule, LogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  items: MegaMenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Soluções',
        root: true,
        items: [
          [
            {
              items: [
                { label: 'Produtos', icon: 'pi pi-cart-plus', subtext: 'Importe sua base de produtos para o sistema' },
                { label: 'Estoque', icon: 'pi pi-box', subtext: 'Tenha o estoque digital de seus produtos' },
                { label: 'Pedidos', icon: 'pi pi-truck', subtext: 'Faça o controle dos seus pedidos' },
              ]
            }
          ],
          [
            {
              items: [
                { label: 'Previsões', icon: 'pi pi-chart-line', subtext: 'Faça previsões de pedidos' },
                { label: 'Usuários', icon: 'pi pi-users', subtext: 'Gerencie os acessos dos seus colaboradores' },
              ]
            }
          ],
          [
            {
              items: [{ image: 'https://primefaces.org/cdn/primeng/images/uikit/uikit-system.png', label: 'GET STARTED', subtext: 'Build spectacular apps in no time.' }]
            }
          ]
        ]
      },
      {
        label: 'Planos',
        root: true
      },
      {
        label: 'Contato',
        root: true
      }
    ];
  }
}
