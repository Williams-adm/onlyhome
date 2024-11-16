import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CreateCategoryComponent } from './pages/create-category/create-category.component';


@NgModule({
  declarations: [
    CategoriesListComponent,
    CreateCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    HttpClientModule,
    LayoutModule,
    PaginatorModule,
    ConfirmDialogModule,
    ToastModule,
  ]
})
export class CategoriesModule { }
