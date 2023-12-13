import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Product } from '@core/interfaces/product.inteface';
import { isEqual } from 'lodash';
import { map, of, startWith, tap } from 'rxjs';

@Component({
  selector: 'ds-product-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatProgressSpinnerModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent {

  @Input() set dsProduct(value: Product) {
    !!value && this.form.patchValue(value);
    const initalValue = this.form.value;
    this.isSameAsInitial$ = this.form.valueChanges.pipe(
      startWith(initalValue),
      map((res) => isEqual(res, initalValue)),
    );
  }

  @Input() isSubmitting = false;
  @Output() dsSubmitedValue = new EventEmitter<Product>();

  isSameAsInitial$ = of(false);

  form = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    price: [null as number, [Validators.required, Validators.min(0.5)]],
    stockQuantity: [1, [Validators.required, Validators.min(1), Validators.max(1000)]],
  });

  constructor(
    private _fb: FormBuilder,
  ) { }

  getErrorMessage(controlName: string): string {
    const control = this.form?.get(controlName);
    return control?.hasError('required') ?
      'Pole wymagane' :
      control?.hasError('minlength') ?
        'Minimalna długość 5 znaków' :
        control?.hasError('min') ?
          `Minimalna wartość ${control?.getError('min')?.min as number}` :
          control?.hasError('max') ?
            `Maksymalna wartość ${control?.getError('max')?.max as number}` : '';
  }

  submit(): void {
    this.dsSubmitedValue.emit(this.form.value as Product);
  }
}
