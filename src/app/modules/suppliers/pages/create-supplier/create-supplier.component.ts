import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SupplierService } from '../../../../shared/services/supplier/supplier.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.css'
})
export class CreateSupplierComponent {
  formSupplier: FormGroup;

  constructor(private form: FormBuilder, private supplierService: SupplierService) {
    this.formSupplier = this.form.group({
      
    })
  }
}
