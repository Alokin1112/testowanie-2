import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '@core/interfaces/product.inteface';
import { ProductsService } from '@core/services/products.service';
import { ProductFormComponent } from '@modules/product-form/product-form.component';
import { Observable, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'ds-add-product-page',
  standalone: true,
  imports: [
    CommonModule, ProductFormComponent
  ],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductPageComponent {

  isSubmitting = false;
  private productsService = inject(ProductsService);
  private router = inject(Router);

  handleSubmit(product: Product): void {
    this.isSubmitting = true;
    this.productsService.add(product).pipe(
      take(1),
    ).subscribe((res) => {
      this.isSubmitting = true;
      void this.router.navigateByUrl('/admin');
    });
  }
}

