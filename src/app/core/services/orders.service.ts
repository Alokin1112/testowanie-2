import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/api.const';
import { Order, OrderStatus } from '@core/interfaces/order.inteface';
import { UsersService } from '@core/services/users.service';
import { environment } from '@env/environment';
import { Observable, Subject, catchError, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private currentOrder$ = new Subject<Order>();

  private http = inject(HttpClient);
  private userService = inject(UsersService);

  get currentOrder(): Observable<Order> {
    return this.currentOrder$.asObservable();
  }

  createNewOrder(): Observable<Order> {
    return this.http.post(`${environment.httpBackend}${API.ORDERS}`, {
      user: this.userService.id,
      orderDate: (new Date()).toISOString(),
      orderStatus: OrderStatus.NEW
    }).pipe(
      switchMap(() => this.getNewOrderByUser()),
      catchError(() => this.getNewOrderByUser()),
      tap((res) => this.currentOrder$.next(res)),
    )
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

}
