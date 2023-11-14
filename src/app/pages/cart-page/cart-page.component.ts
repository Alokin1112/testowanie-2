import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '@modules/cart/cart.component';

@Component({
  selector: 'ds-cart-page',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent {

}
