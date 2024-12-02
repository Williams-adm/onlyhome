import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuppliersListComponent } from './pages/suppliers-list/suppliers-list.component';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '../layout/layout.module';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CreateSupplierComponent } from './pages/create-supplier/create-supplier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditSupplierComponent } from './pages/edit-supplier/edit-supplier.component';
import { DropdownModule } from 'primeng/dropdown';



@NgModule({
  declarations: [
    SuppliersListComponent,
    CreateSupplierComponent,
    EditSupplierComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    HttpClientModule,
    LayoutModule,
    PaginatorModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule, 
    ReactiveFormsModule,
    DropdownModule,
  ]
})
export class SuppliersModule { }
