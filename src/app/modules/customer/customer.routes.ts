import { Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { customerGuard } from './guards/customer.guard';
import { ListCategoriesComponent } from './pages/categories/list-categories/list-categories.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    canActivate: [customerGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'categories', component: ListCategoriesComponent },
    ],
  },
];
