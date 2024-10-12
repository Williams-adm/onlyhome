import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { indexEmployees } from '../models/employeeIndex';
import { showEmployee } from '../models/employeeShow';

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

}
