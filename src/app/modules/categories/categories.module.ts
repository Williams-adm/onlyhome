import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './pages/categories-list/categories-list.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CategoriesListComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    HttpClientModule,
    LayoutModule
  ]
})
export class CategoriesModule { }
