import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Pagination } from '@core/interfaces/page.inteface';

@Component({
  selector: 'ds-pagination',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() pagination: Pagination;
  @Input() maxPageCount: number;

  @Output() previousPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();
}
