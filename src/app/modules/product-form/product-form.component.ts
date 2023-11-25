import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Product } from '@core/interfaces/product.inteface';

@Component({
  selector: 'ds-product-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit {

  form = this._fb.group({
    name: ['', [Validators.required]],
    price: [null as number, [Validators.required]],
    stockQuantity: [null as number, [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    private _fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    if (this.data) {
      this.form.patchValue(this.data as unknown);
    }
  }

  submit(): void {
    this.dialogRef.close(this.form.value);

    this.form.reset();
  }
}
