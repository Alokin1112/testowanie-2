import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@core/interfaces/product.inteface';
import { ProductsService } from '@core/services/products.service';
import { ProductFormComponent } from '@modules/product-form/product-form.component';
import { Observable, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'ds-edit-product-page',
  standalone: true,
  imports: [
    CommonModule, ProductFormComponent, MatProgressSpinnerModule
  ],
  templateUrl: './edit-product-page.component.html',
  styleUrl: './edit-product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductPageComponent implements OnInit {

  product$: Observable<Product>;
  isSubmitting = false;

  private productsService = inject(ProductsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.product$ = this.route.params.pipe(
      map((params) => params['id'] as number),
      switchMap((id) => this.productsService.getById(id))
    );
  }
  handleSubmit(product: Product, id: number): void {
    this.isSubmitting = true;
    this.productsService.edit({ ...product, id }).pipe(
      take(1),
    ).subscribe((res) => {
      this.isSubmitting = true;
      void this.router.navigateByUrl('/admin');
    });
  }
}
