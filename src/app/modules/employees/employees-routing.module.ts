import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './pages/employees-list/employees-list.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';

const routes: Routes = [
  {
    path : '', component : EmployeesListComponent
  },
  {
    path: 'create', component: CreateEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
