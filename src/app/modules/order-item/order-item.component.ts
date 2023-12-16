import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Order } from '@core/interfaces/order.inteface';
import { PricePipe } from '@shared/pipes/price.pipe';

@Component({
  selector: 'ds-order-item',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, PricePipe,
  ],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemComponent {
  @Input() dsOrder: Order;

  get totalPrice(): number {
    return this.dsOrder?.orderDetails?.map((item) => item?.price).reduce((a, b) => a + b, 0);
  }
}
