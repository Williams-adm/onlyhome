import { Component, OnInit } from '@angular/core';
import { Datum, gEmployees, Links, Meta } from '../../../../shared/models/employee';
import { EmployeeService } from '../../../../shared/services/employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css',
})
export class EmployeesListComponent implements OnInit{
  employeesList: Datum[] = [];
  links: Links | undefined;
  meta: Meta | undefined;

  constructor(private employeeService: EmployeeService) { }
  
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((data: gEmployees) => {
      this.employeesList = data.data;
      this.links = data.links;
      this.meta = data.meta;

      console.log(this.employeesList, this.links, this.meta);
    })
  }

}
