import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Product } from '@core/interfaces/product.inteface';
import { PricePipe } from '@shared/pipes/price.pipe';

@Component({
  selector: 'ds-product-admin-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, PricePipe, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-admin-item.component.html',
  styleUrl: './product-admin-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAdminItemComponent {
  @Input() dsProduct: Product;

  @Output() dsDelete = new EventEmitter<void>();

}
