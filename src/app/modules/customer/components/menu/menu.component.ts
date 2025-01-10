import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, Menu],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  items: MenuItem[] = [
    {
      label: 'Início',
      icon: 'pi pi-home',
      styleClass: 'mt-4',
      items: [
        { label: 'Visão Geral', icon: 'pi pi-eye', routerLink: '/customer/home' },
      ]
    },
    {
      label: 'Estoque',
      icon: 'pi pi-warehouse',
      styleClass: 'mt-4',
      items: [
        { label: 'Controle de Estoque', icon: 'pi pi-receipt' },
      ]
    },
    {
      label: 'Estatísticas',
      icon: 'pi pi-chart-bar',
      styleClass: 'mt-4',
      items: [
        { label: 'Dashboard', icon: 'pi pi-wave-pulse' },
        { label: 'Previsões', icon: 'pi pi-chart-line' },
      ]
    },
    {
      label: 'Cadastros',
      icon: 'pi pi-th-large',
      styleClass: 'mt-4',
      items: [
        { label: 'Categorias', icon: 'pi pi-tag', routerLink: 'categories' },
        { label: 'Produtos', icon: 'pi pi-box' },
        { label: 'Pedidos', icon: 'pi pi-shopping-cart' },
        { label: 'Entradas', icon: 'pi pi-cart-plus' },
        { label: 'Saídas', icon: 'pi pi-cart-minus' },
      ]
    },
  ]
}
