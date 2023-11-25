import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BasketItem } from '@core/interfaces/basket.interface';
import { BasketService } from '@core/services/basket.service';
import { OrdersService } from '@core/services/orders.service';
import { UsersService } from '@core/services/users.service';
import { ProductsComponent } from '@modules/products/products.component';
import { Observable, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductsComponent, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule]
})
export class AppComponent implements OnInit {

  basketItemsAmount$: Observable<number>;

  private basketService = inject(BasketService);
  private orderService = inject(OrdersService);

  constructor() {
    this.orderService.createNewOrder().pipe(
      takeUntilDestroyed()
    ).subscribe();
  }

  ngOnInit(): void {
    this.basketItemsAmount$ = this.basketService.get().pipe(
      map((res) => res?.map((item) => item?.quantity).reduce((a, b) => a + b, 0))
    );
  }

}
