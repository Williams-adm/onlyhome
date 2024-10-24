import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Datum, indexEmployees, Meta } from '../../../../shared/models/employeeIndex';
import { EmployeeService } from '../../../../shared/services/employee.service';
import { Data, showEmployee } from '../../../../shared/models/employeeShow';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css',
  
})
  
export class EmployeesListComponent implements OnInit {
  employeesList: Datum[] = [];
  meta: Meta | undefined;
  env = environment;
  totalRecords: number = 0;
  loading: boolean = false;
  visible: boolean = false;
  selectedEmployee: Data | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees({ first: 0, rows: 15 });
  }

  loadEmployees(event: any) {
    if (this.loading) return;

    this.loading = true;

    const page = event.first / event.rows + 1;
    const perPage = event.rows;

    this.employeeService
      .indexEmployees(page, perPage)
      .subscribe((data: indexEmployees) => {
        this.employeesList = data.data;
        this.totalRecords = data.meta.total;
        this.loading = false;
      },
      error => {
        console.error("Error al cargar a los empleados", error)
        this.loading = false;
      }
    );
  }

  showDialog(id : number) {
    this.employeeService.showEmployees(id).subscribe((data: showEmployee) => {
      this.visible = true;
      this.selectedEmployee = data.data;
    })
  }

  onToggleChange(employeeId: number, currentStatus: number): void {
  const newStatus = currentStatus === 1 ? 0 : 1;
  this.employeeService.patchEmployees(employeeId, { user: { status: newStatus } })
    .subscribe(
      response => {
        const employee = this.employeesList.find(emp => emp.id === employeeId);
        if (employee) {
          employee.user.status = newStatus;
        }
      },
      error => {
        console.error('Error al actualizar el estado del empleado', error);
      }
    );
}
}
