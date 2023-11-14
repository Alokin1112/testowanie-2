import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '@modules/products/products.component';

@Component({
  selector: 'ds-home-page',
  standalone: true,
  imports: [CommonModule, ProductsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {

}
