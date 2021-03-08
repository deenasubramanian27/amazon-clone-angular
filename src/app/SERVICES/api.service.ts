import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private __jsonUrl = "assets/DATA/products.json"
  constructor(private Http: HttpClient) { }

  
  getJson():Observable<any> {
    return this.Http.get(this.__jsonUrl);
  }
}

