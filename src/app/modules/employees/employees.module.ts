import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './pages/employees-list/employees-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog'; 
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    EmployeesListComponent,
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    PaginatorModule,
    DialogModule,
    InputNumberModule,
    DropdownModule,
    FileUploadModule,
    PasswordModule
  ]
})
  
export class EmployeesModule { }