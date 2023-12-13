import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Product } from '@core/interfaces/product.inteface';
import { PricePipe } from '@shared/pipes/price.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BasketItem } from '@core/interfaces/basket.interface';
import { Observable, map } from 'rxjs';
import { BasketService } from '@core/services/basket.service';

@Component({
  selector: 'ds-products-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, PricePipe, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './products-item.component.html',
  styleUrl: './products-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsItemComponent implements OnInit {
  @Input({ required: true }) set dsProduct(val: Product) {
    this.product = val;
    this.amountInput = new FormControl<number>(1, [Validators.required, Validators.min(1), Validators.max(val?.stockQuantity)]);
  }

  @Output() dsAddItemToBasket = new EventEmitter<BasketItem>();

  basketService = inject(BasketService);

  product: Product;
  itemCountInBasket$: Observable<number>;
  amountInput: FormControl<number>;

  ngOnInit(): void {
    this.itemCountInBasket$ = this.basketService.get().pipe(
      map((res) => res?.filter((item) => item?.product?.id == this.product.id).map((item) => item?.quantity).reduce((a, b) => a + b, 0))
    );
  }

  addItem(): void {
    const quantity = this.amountInput.value;

    this.amountInput.reset(1);

    this.dsAddItemToBasket.emit({
      product: this.product,
      quantity,
    });
  }
}
