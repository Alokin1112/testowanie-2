import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/api.const';
import { BasketItemDTO } from '@core/interfaces/basket.interface';
import { Order, OrderStatus } from '@core/interfaces/order.inteface';
import { UsersService } from '@core/services/users.service';
import { environment } from '@env/environment';
import { Observable, Subject, catchError, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private http = inject(HttpClient);
  private userService = inject(UsersService);

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

}
