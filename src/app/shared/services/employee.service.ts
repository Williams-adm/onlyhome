import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { indexEmployees, User } from '../models/employeeIndex';
import { showEmployee } from '../models/employeeShow';
import { storeEmployee } from '../models/employeeStore';

@Injectable({
  providedIn: 'root'
})
  
export class EmployeeService {

  constructor(private http: HttpClient) { }
  
  public indexEmployees(page: number, perPage: number): Observable<indexEmployees> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<indexEmployees>(
      `${environment.backendBaseUrl}/api/v1/employees`, { params });
  }

  public showEmployees(id: Number): Observable<showEmployee> {
    return this.http.get<showEmployee>(
      `${environment.backendBaseUrl}/api/v1/employees/${id}`
    )
  }

  public storeEmployees(employee: storeEmployee): Observable<{ message: string }>{
    return this.http.post<{ message: string }>(
      `${environment.backendBaseUrl}/api/v1/employees`, employee
    )
  }

  public patchEmployees(id: Number, employeeData: Partial<storeEmployee>): Observable<{ message: string }>{
    return this.http.patch<{ message: string }>(
      `${environment.backendBaseUrl}/api/v1/employees/${id}`, employeeData
    )
  }
 
}
