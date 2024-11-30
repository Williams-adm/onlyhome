import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from '../../../../shared/services/supplier/supplier.service';
import { RucService } from '../../../../shared/services/apiExterno/ruc/ruc.service';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrl: './create-supplier.component.css'
})
export class CreateSupplierComponent {
  formSupplier: FormGroup;

  constructor(private form: FormBuilder, private supplierService: SupplierService, private rucService: RucService) {
    this.formSupplier = this.form.group({
      num_ruc: ['', Validators.required],
      business_name: ['', Validators.required],
      fiscal_address: [''],
      phone: ['', Validators.required],
      contac: [''],
    })
  }

  searchRuc() {
    const ruc = this.formSupplier.get('num_ruc')?.value;
    if (!ruc) {
      console.log('ruc invalido');
      return;
    }

    this.rucService.showRuc(ruc).subscribe({
      next: (data) => {
        if (data) {
          this.formSupplier.patchValue({
            business_name: data.razonSocial,
            fiscal_address: data.direccion,
          });
          console.log(data)
        } else {
          console.log('no se encontraron datos para este ruc')
        }
      },
      error: (err) => {
        console.log('error al consultar el ruc: ', err)
      }
    })
  }

}