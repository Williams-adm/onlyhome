import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { gEmployees } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public getAllEmployees(): Observable<gEmployees>{
    return this.http.get<gEmployees>(
      `${environment.backendBaseUrl}/api/v1/employees`);
  }
}
