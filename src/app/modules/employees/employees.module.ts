import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './pages/employees-list/employees-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { HttpClientJsonpModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    HttpClientJsonpModule,
    TableModule
  ]
})
export class EmployeesModule { }
