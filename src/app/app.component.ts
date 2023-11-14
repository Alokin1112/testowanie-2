import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BasketItem } from '@core/interfaces/basket.interface';
import { BasketService } from '@core/services/basket.service';
import { ProductsComponent } from '@modules/products/products.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, ProductsComponent, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule]
})
export class AppComponent implements OnInit {
  title = 'angular-template';

  basketItems$: Observable<BasketItem[]>;

  private basketService = inject(BasketService);

  ngOnInit(): void {
    this.basketItems$ = this.basketService.get();
  }

}
