import { Component, inject, viewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service';

import { Category } from '@/core/models/category';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { Table, TableModule } from 'primeng/table';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'app-list-categories',
  imports: [StyleClassModule, Toolbar, TableModule, ButtonModule, InputIconModule, InputTextModule, IconFieldModule, AsyncPipe],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.scss'
})
export class ListCategoriesComponent {
  categoryService = inject(CategoryService)

  categories$ = this.categoryService.findAll()

  selectedCategories!: Category[] | null;

  dt = viewChild<Table>('dt')

  handleFilterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    return this.dt()?.filterGlobal(inputElement.value, 'contains');
  }
}
