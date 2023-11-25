import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/api.const';
import { Page, Pagination } from '@core/interfaces/page.inteface';
import { Product } from '@core/interfaces/product.inteface';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private http = inject(HttpClient);
  private pagination$ = new BehaviorSubject<Pagination>({
    page: 0,
    size: 20,
  });

  getAll(): Observable<Page<Product[]>> {
    return this.pagination$.asObservable().pipe(
      switchMap((pagination) => {
        const params = new HttpParams({ fromObject: pagination as unknown as Record<string, number> });
        return this.http.get<Page<Product[]>>(`${environment.httpBackend}${API.PRODUCTS}`, { params });
      })
    )

  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.httpBackend}${API.PRODUCTS_ID.replace(":id", (id || 0).toString())}`);
  }

  add(product: Product): Observable<unknown> {
    return this.http.post(`${environment.httpBackend}${API.PRODUCTS}`, product);
  }

  edit(product: Product): Observable<unknown> {
    return this.http.put(`${environment.httpBackend}${API.PRODUCTS}`, product);
  }


  delete(id: number): Observable<unknown> {
    return this.http.delete<Product>(`${environment.httpBackend}${API.PRODUCTS_ID.replace(":id", (id || 0).toString())}`);
  }

  get pagination(): Observable<Pagination> {
    return this.pagination$.asObservable();
  }

  nextPage() {
    this.pagination$.next({
      page: this.pagination$.getValue().page + 1,
      size: this.pagination$.getValue().size,
    });
  }

  previousPage() {
    this.pagination$.next({
      page: this.pagination$.getValue().page - 1,
      size: this.pagination$.getValue().size,
    });
  }

}
