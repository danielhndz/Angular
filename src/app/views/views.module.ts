import { NgModule } from '@angular/core';
import { ViewsRoutingModule } from './views-routing.module';
import { LayoutComponent } from './components/layout/layout.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    PageNotFoundComponent
  ],
  imports: [
    ViewsRoutingModule,
    SharedModule
  ]
})
export class ViewsModule { }
