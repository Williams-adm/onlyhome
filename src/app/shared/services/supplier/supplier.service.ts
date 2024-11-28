import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { indexSuppliers } from '../../models/supplier/supplierIndex';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  public indexSuppliers(page:number, perPage:number):Observable<indexSuppliers>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
    return this.http.get<indexSuppliers>(
      `${environment.backendBaseUrl}/api/v1/suppliers`, { params }
    );
  }
}
