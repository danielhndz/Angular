import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import * as fromElements from './index';


@NgModule({
  declarations: [
    fromElements.elements,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    fromElements.elements,
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
