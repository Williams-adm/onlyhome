import { Component, OnInit } from '@angular/core';
import { Datum, gEmployees, Links, Meta } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../shared/services/employee.service';
import { environment } from '../../../../../environments/environment.development';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css',
})
export class EmployeesListComponent implements OnInit{
  employeesList: Datum[] = [];
  links: Links | undefined;
  meta: Meta | undefined;
  env = environment;
  totalRecords: number = 0;
  loading: boolean = true;

  constructor(private employeeService: EmployeeService) { }
  
  /* ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((data: gEmployees) => {
      this.employeesList = data.data;
      this.links = data.links;
      this.meta = data.meta;

      console.log(this.employeesList, this.links, this.meta);
    })
  } */

  ngOnInit(): void {
    this.loadEmployees({ first: 0, rows: 15 });  // Cargar la primera página por defecto
  }

  loadEmployees(event: any) {
    this.loading = true;

    const page = event.first / event.rows + 1;  // Calcular la página actual (página es 1-indexada)
    const perPage = event.rows;  // Número de registros por página

    this.employeeService.getEmployees(page, perPage).subscribe((data: gEmployees) => {
      this.employeesList = data.data;
      this.totalRecords = data.meta.total;  // Asigna el número total de registros
      this.loading = false;
    });
  }
  
}
