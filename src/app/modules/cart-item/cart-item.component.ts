import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PricePipe } from '@shared/pipes/price.pipe';
import { BasketItem } from '@core/interfaces/basket.interface';
import { Product } from '@core/interfaces/product.inteface';

@Component({
  selector: 'ds-cart-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, PricePipe, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input({ required: true }) set dsBasketItem(val: BasketItem) {
    this.basketItem = val;
    this.amountInput = new FormControl<number>(val?.quantity, [Validators.required, Validators.min(1), Validators.max(val?.product?.stockQuantity)]);
  }

  basketItem: BasketItem;
  amountInput: FormControl<number>;

}
