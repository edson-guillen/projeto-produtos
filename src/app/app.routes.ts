import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },

  {
    path: 'product-list',
    loadComponent: () =>
      import('./pages/product-list/product-list.page').then(m => m.ProductListPage)
  },

  {
    path: 'product-form/:id',
    loadComponent: () =>
      import('./pages/product-form/product-form.page').then(m => m.ProductFormPage)
  }
];
