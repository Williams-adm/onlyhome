import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { indexCategories } from '../../models/category/categoryIndex';
import { environment } from '../../../../environments/environment.development';
import { storeCategory } from '../../models/category/categoryStore';
import { showCategory } from '../../models/category/categoryShow';
import { updateCategory, updateCategoryStatus } from '../../models/category/categoryUpdate';

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

  public showCategory(id: Number): Observable<showCategory>{
    return this.http.get<showCategory>(
      `${environment.backendBaseUrl}/api/v1/categories/${id}`
    )
  }

  public storeCategories(category: storeCategory): Observable<{ message: string }>{
    return this.http.post<{ message: string }>(
      `${environment.backendBaseUrl}/api/v1/categories`, category
    )
  }

  public updateCategories(id: Number, category: updateCategory): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${environment.backendBaseUrl}/api/v1/categories/${id}`, category
    )
  }

  public patchCategories(id: Number, category: Partial<updateCategory>): Observable<{ message: string }>{
    return this.http.patch<{ message: string }>(
      `${environment.backendBaseUrl}/api/v1/categories/${id}`, category
    )
  }
  
  public patchCategoriesStatus(id: Number, category: Partial<updateCategoryStatus>): Observable<{ message: string }>{
    return this.http.patch<{ message: string }>(
      `${environment.backendBaseUrl}/api/v1/categories/${id}`, category
    )
  }
}
