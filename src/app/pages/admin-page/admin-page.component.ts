import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Page, Pagination } from '@core/interfaces/page.inteface';
import { Product } from '@core/interfaces/product.inteface';
import { ProductsService } from '@core/services/products.service';
import { PaginationComponent } from '@modules/pagination/pagination.component';
import { ProductAdminItemComponent } from '@modules/product-admin-item/product-admin-item.component';
import { BehaviorSubject, Observable, switchMap, take } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ProductFormComponent } from '@modules/product-form/product-form.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'ds-admin-page',
  standalone: true,
  imports: [
    CommonModule, MatProgressSpinnerModule, PaginationComponent,
    ProductAdminItemComponent, MatSnackBarModule, MatDialogModule, RouterModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPageComponent implements OnInit {

  update$ = new BehaviorSubject<void>(null);

  products$: Observable<Page<Product[]>>;
  pagination$: Observable<Pagination>;

  private productService = inject(ProductsService);
  private _snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.pagination$ = this.productService.pagination;
    this.products$ = this.update$.pipe(
      switchMap(() => this.productService.getAll())
    );
  }

  deleteItem(product: Product) {
    this.productService.delete(product.id).pipe(
      take(1),
    ).subscribe((res) => this.update$.next());
  }

  editItem(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: product,
      width: '400px',
      height: '300px',
      scrollStrategy: new NoopScrollStrategy(),
    });

    dialogRef.afterClosed().pipe(
      switchMap((res: Product) => this.productService.edit({
        ...res,
        id: product?.id,
      }))
    ).subscribe((res) => this.update$.next());
  }

  nextPage(): void {
    this.productService.nextPage();
  }

  previousPage(): void {
    this.productService.previousPage();
  }

}
