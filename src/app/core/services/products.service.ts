import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/api.const';
import { Page } from '@core/interfaces/page.inteface';
import { Product } from '@core/interfaces/product.inteface';
import { MOCK_PRODUCTS } from '@core/mocks/products.mock';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);

  getAll(): Observable<Page<Product[]>> {
    return of({ content: MOCK_PRODUCTS } as unknown as Page<Product[]>);
    return this.http.get<Page<Product[]>>(`${environment.httpBackend}${API.PRODUCTS}`);
  }

  getById(id: number): Observable<Product> {
    return of(MOCK_PRODUCTS[0]);
    return this.http.get<Product>(`${environment.httpBackend}${API.PRODUCTS_ID.replace(":id", (id || 0).toString())}`);
  }

  add(product: Product): Observable<unknown> {
    return of(1);
    return this.http.post(`${environment.httpBackend}${API.PRODUCTS}`, product);
  }

  edit(product: Product): Observable<unknown> {
    return of(1);
    return this.http.put(`${environment.httpBackend}${API.PRODUCTS}`, product);
  }


  delete(id: number): Observable<unknown> {
    return of(1);
    return this.http.delete<Product>(`${environment.httpBackend}${API.PRODUCTS_ID.replace(":id", (id || 0).toString())}`);
  }

}
