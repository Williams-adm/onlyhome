import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RucService {

  constructor(private http: HttpClient) { }

  public showRuc(ruc: number): Observable<any> {
    return this.http.get<any>(
      `${environment.backendBaseUrl}/api/v1/ruc/${ruc}`
    )
  }
}
