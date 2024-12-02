import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { indexSuppliers } from '../../models/supplier/supplierIndex';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { updateSupplierStatus } from '../../models/supplier/supplierUpdate';
import { storeSupplier } from '../../models/supplier/supplierStore';
import { showSupplier } from '../../models/supplier/supplierShow';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }

  public indexSuppliers(page: number, perPage: number): Observable<indexSuppliers> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
    return this.http.get<indexSuppliers>(
      `${environment.backendBaseUrl}/api/v1/suppliers`, { params }
    );
  }

  public showSupplier(id: Number): Observable<showSupplier>{
    return this.http.get<showSupplier>(
      `${environment.backendBaseUrl}/api/v1/suppliers/${id}`
    )
  }
  
  public storeSupplier(supplier: storeSupplier): Observable<{ message: string }>{
    return this.http.post<{ message: string }>(
      `${environment.backendBaseUrl}/api/v1/suppliers`, supplier
    )
  }

  public patchSupplierStatus(id: number, supplier: Partial<updateSupplierStatus>): Observable<{ message: string }>{
    return this.http.patch<{ message: string }>(
      `${environment.backendBaseUrl}/api/v1/suppliers/${id}`, supplier
    )
  }
}
