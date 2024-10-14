import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './pages/employees-list/employees-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { HttpClientJsonpModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeesListComponent,
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    HttpClientJsonpModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ToggleButtonModule,
    FormsModule
  ]
})
export class EmployeesModule { }
