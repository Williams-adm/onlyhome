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
  env = environment;
  currentPage: number = 1;
  pageSize: number = 15;
  totalRecords: number = 0;
  visible: boolean = false;
  selectedEmployee: Data | null = null;

  constructor(private employeeService: EmployeeService) {}

  /* inicializando el componente y trae los datos al cargar la pagina, y cuando se pagina*/
  ngOnInit(): void {
    this.loadEmployees({ first: 0, rows: 15 });
  }

  /* Se usa para llenar el employeeList y ser usado por el ngOinit */
  loadEmployees(event: any) {
    const page = event.first / event.rows + 1;
    this.currentPage = page;
    this.pageSize = event.rows;

    this.employeeService
      .indexEmployees(page, event.rows)
      .subscribe((data: indexEmployees) => {
        this.employeesList = data.data;
        this.totalRecords = data.meta.total;
      },
      error => {
        console.error("Error al cargar a los empleados", error)
      }
    );
  }

  /* funcion para ver 1 empleado en especifico */
  showDialog(id : number) {
    this.employeeService.showEmployees(id).subscribe((data: showEmployee) => {
      this.visible = true;
      this.selectedEmployee = data.data;
    })
  }

  /* Funcion para el status del empleado */
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
