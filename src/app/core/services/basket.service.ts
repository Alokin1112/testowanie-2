import { Injectable } from '@angular/core';
import { BasketItem } from '@core/interfaces/basket.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basket$ = new BehaviorSubject<BasketItem[]>([]);

  get(): Observable<BasketItem[]> {
    return this.basket$.asObservable();
  }

  addItem(basketItem: BasketItem): void {
    this.basket$.next([
      ...this.basket$.getValue(), basketItem
    ]);
  }

  removeItem(itemId: number): void {
    this.basket$.next([
      ...this.basket$.getValue().filter((item) => item?.product?.id !== itemId)
    ]);
  }

}
