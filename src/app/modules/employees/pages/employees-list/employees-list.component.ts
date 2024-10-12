import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Datum, indexEmployees, Links, Meta } from '../../../../shared/models/employeeIndex';
import { EmployeeService } from '../../../../shared/services/employee.service';
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css',
})
export class EmployeesListComponent implements OnInit {
  employeesList: Datum[] = [];
  links: Links | undefined;
  meta: Meta | undefined;
  env = environment;
  totalRecords: number = 0;
  loading: boolean = true;
  visible: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees({ first: 0, rows: 15 });
  }

  loadEmployees(event: any) {
    this.loading = true;

    const page = event.first / event.rows + 1;
    const perPage = event.rows;

    this.employeeService
      .indexEmployees(page, perPage)
      .subscribe((data: indexEmployees) => {
        this.employeesList = data.data;
        this.totalRecords = data.meta.total;
        this.loading = false;
      });
  }

  showDialog() {
    this.visible = true;
    console.log('hola');
  }
}
