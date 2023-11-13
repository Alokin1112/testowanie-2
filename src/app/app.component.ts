import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from '@modules/products/products.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BasketService } from '@core/services/basket.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductsComponent, MatToolbarModule, MatIconModule, MatButtonModule]
})
export class AppComponent implements OnInit {
  title = 'angular-template';

  itemsLength$: Observable<number>;

  private basketService = inject(BasketService);

  ngOnInit(): void {
    this.itemsLength$ = this.basketService.get().pipe(
      map((res) => res?.length)
    );
  }

}
