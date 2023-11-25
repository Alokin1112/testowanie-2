import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-orders-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent { }
