import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersListComponent } from './pages/suppliers-list/suppliers-list.component';
import { SuppliersRoutingModule } from './suppliers-routing.module';



@NgModule({
  declarations: [
    SuppliersListComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule
  ]
})
export class SuppliersModule { }
