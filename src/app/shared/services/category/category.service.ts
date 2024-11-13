import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { indexCategories } from '../../models/category/categoryIndex';
import { environment } from '../../../../environments/environment.development';
import { storeCategory } from '../../models/category/categoryStore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public indexCategories(page:number, perPage:number):Observable<indexCategories>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
    return this.http.get<indexCategories>(
      `${environment.backendBaseUrl}/api/v1/categories`, { params }
    );
  }

  public patchCategories(id: Number, categoryData: Partial<storeCategory>): Observable<{ message: string }>{
    return this.http.patch<{ message: string }>(
      `${environment.backendBaseUrl}/api/v1/categories/${id}`, categoryData
    )
  }
}
