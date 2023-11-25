import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BasketItem } from '@core/interfaces/basket.interface';
import { Page, Pagination } from '@core/interfaces/page.inteface';
import { Product } from '@core/interfaces/product.inteface';
import { BasketService } from '@core/services/basket.service';
import { ProductsService } from '@core/services/products.service';
import { PaginationComponent } from '@modules/pagination/pagination.component';
import { ProductsItemComponent } from '@modules/products-item/products-item.component';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'ds-products',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, ProductsItemComponent, PaginationComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {

  update$ = new BehaviorSubject<void>(null);

  products$: Observable<Page<Product[]>>;
  pagination$: Observable<Pagination>;

  private productService = inject(ProductsService);

  private basketService = inject(BasketService);

  ngOnInit(): void {
    this.pagination$ = this.productService.pagination;
    this.products$ = this.update$.pipe(
      switchMap(() => this.productService.getAll())
    );
  }

  addItemToBasket(basketItem: BasketItem): void {
    this.basketService.addItem(basketItem);
  }

  nextPage(): void {
    this.productService.nextPage();
  }

  previousPage(): void {
    this.productService.previousPage();
  }

}
