import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BasketItem } from '@core/interfaces/basket.interface';
import { Order } from '@core/interfaces/order.inteface';
import { Page, Pagination } from '@core/interfaces/page.inteface';
import { Product } from '@core/interfaces/product.inteface';
import { BasketService } from '@core/services/basket.service';
import { OrdersService } from '@core/services/orders.service';
import { ProductsService } from '@core/services/products.service';
import { OrderItemComponent } from '@modules/order-item/order-item.component';
import { PaginationComponent } from '@modules/pagination/pagination.component';
import { ProductsItemComponent } from '@modules/products-item/products-item.component';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'ds-orders',
  standalone: true,
  imports: [
    CommonModule, MatProgressSpinnerModule, ProductsItemComponent, PaginationComponent, OrderItemComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {

  update$ = new BehaviorSubject<void>(null);

  orders$: Observable<Page<Order[]>>;
  pagination$: Observable<Pagination>;

  private orderService = inject(OrdersService);


  ngOnInit(): void {
    this.pagination$ = this.orderService.pagination;
    this.orders$ = this.update$.pipe(
      switchMap(() => this.orderService.getAll())
    );
  }

  nextPage(): void {
    this.orderService.nextPage();
  }

  previousPage(): void {
    this.orderService.previousPage();
  }

}
