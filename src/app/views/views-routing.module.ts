import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'products',
                loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
            },
            {
                path: 'contact',
                loadChildren: () => import('../contact/contact.module').then(m => m.ContactModule)
            },
            {
                path: 'order',
                loadChildren: () => import('../order/order.module').then(m => m.OrderModule)
            },
            {
                path: '404',
                component: PageNotFoundComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ViewsRoutingModule { }
