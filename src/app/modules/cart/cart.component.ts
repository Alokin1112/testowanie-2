import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketService } from '@core/services/basket.service';
import { CartItemComponent } from '@modules/cart-item/cart-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, map } from 'rxjs';
import { BasketItem } from '@core/interfaces/basket.interface';
import { isEqual, uniqBy } from 'lodash';
import { MatButtonModule } from '@angular/material/button';
import { PricePipe } from '@shared/pipes/price.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ds-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, MatProgressSpinnerModule, MatButtonModule, PricePipe, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {

  basketItems$: Observable<BasketItem[]>;
  sum$: Observable<number>;

  private basketService = inject(BasketService);

  ngOnInit(): void {
    this.basketItems$ = this.basketService.get().pipe(
      map((res) => {
        const unique = uniqBy(res, (x: BasketItem) => x?.product);

        return unique.map((item) => ({
          product: item?.product,
          quantity: res?.filter((fItem) => isEqual(item?.product, fItem?.product)).map((fItem) => fItem?.quantity)?.reduce((a, b) => a + b, 0)
        }));
      })
    );

    this.sum$ = this.basketService.get().pipe(
      map((res) => res?.map((item) => item?.product?.price * item?.quantity)?.reduce((a, b) => a + b, 0)),
    );
  }
}
