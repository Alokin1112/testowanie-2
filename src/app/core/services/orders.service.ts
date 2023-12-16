import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/api.const';
import { BasketItemDTO } from '@core/interfaces/basket.interface';
import { Order, OrderStatus } from '@core/interfaces/order.inteface';
import { Pagination, Page } from '@core/interfaces/page.inteface';
import { Product } from '@core/interfaces/product.inteface';
import { UsersService } from '@core/services/users.service';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, Subject, catchError, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private http = inject(HttpClient);
  private userService = inject(UsersService);

  private pagination$ = new BehaviorSubject<Pagination>({
    page: 0,
    size: 20,
  });

  getAll(): Observable<Page<Order[]>> {
    return this.pagination$.asObservable().pipe(
      switchMap((pagination) => {
        const params = new HttpParams({ fromObject: pagination as unknown as Record<string, number> }).append("sort", "id,desc");
        return this.http.get<Page<Order[]>>(`${environment.httpBackend}${API.ORDERS}`, { params });
      })
    )
  }

  createNewOrder(items: BasketItemDTO[]): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${environment.httpBackend}${API.ORDERS}`, {
      user: this.userService.id,
      orderDate: (new Date()).toISOString(),
      orderStatus: OrderStatus.NEW,
      items
    });
  }

  getNewOrderByUser(): Observable<Order> {
    const params = new HttpParams({
      fromObject: {
        username: this.userService.id,
        orderStatus: OrderStatus.NEW
      }
    })
    return this.http.get<Order>(`${environment.httpBackend}${API.ORDERS}`, { params });
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
