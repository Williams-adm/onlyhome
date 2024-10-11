import { HttpClient , HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { gEmployees } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  /* public getAllEmployees(): Observable<gEmployees>{
    return this.http.get<gEmployees>(
      `${environment.backendBaseUrl}/api/v1/employees`);
  } */
  
  public getEmployees(page: number, perPage: number): Observable<gEmployees> {
    // Añadimos los parámetros de paginación a la solicitud
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<gEmployees>(
      `${environment.backendBaseUrl}/api/v1/employees`, { params });
  }

}
