import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { TableComponent } from './components/table/table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsListComponent } from 'src/app/admin/components/products-list/products-list.component';
import { ProductEditComponent } from 'src/app/admin/components/product-edit/product-edit.component';


const routes: Routes = [
  {
    path: '',
    component: AdminNavComponent,
    children: [
      {
        path: 'create',
        component: ProductFormComponent
      },
      {
        path: 'table',
        component: TableComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'products/edit/:id',
        component: ProductEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
