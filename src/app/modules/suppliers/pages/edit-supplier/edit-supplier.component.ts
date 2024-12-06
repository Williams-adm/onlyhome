import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Data, showSupplier } from '../../../../shared/models/supplier/supplierShow';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { updateSupplier } from '../../../../shared/models/supplier/supplierUpdate';
import { SupplierService } from '../../../../shared/services/supplier/supplier.service';
import { RucService } from '../../../../shared/services/apiExterno/ruc/ruc.service';
import { prefix } from '../../../../shared/models/polymorphic/phone';
import { ActivatedRoute } from '@angular/router';
import isEqual from 'lodash/isEqual';

/* funcion para transformar y acceder a los enum, usados en los modelos ->para los dropdown */
function enumToOptions<T extends Record<string, unknown>>(enumObj: T): { label: string; value: T[keyof T] }[] {
  return Object.keys(enumObj).map(key => ({
    label: key,
    value: enumObj[key] as T[keyof T]
  }));
}

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrl: './edit-supplier.component.css',
  providers: [ConfirmationService, MessageService]
})
  
export class EditSupplierComponent {
  supplier: Data | null = null;
  supplierId: number = 0;
  formSupplier: FormGroup;
  prefixs: { label: string; value: prefix }[];
  originalSupplier: Partial<any> = {}

  constructor(private form: FormBuilder, private supplierService: SupplierService, private rucService: RucService,
    private messageService: MessageService, private confirmationService: ConfirmationService, private route: ActivatedRoute
  ) {
    this.formSupplier = this.form.group({
      num_ruc: ['', Validators.required],
      business_name: ['', Validators.required],
      fiscal_address: [''],
      prefix: ['', Validators.required],
      phone: ['', Validators.required],
      contac: [''],
    })
    this.prefixs = enumToOptions(prefix);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.supplierId = Number(params.get('id'));
      this.showSupplierDetails(this.supplierId)
    })
  }

  showSupplierDetails(id: number): void {
    this.supplierService.showSupplier(id).subscribe(
      (data: showSupplier) => {
        this.supplier = data.data
        this.originalSupplier = { ...this.supplier}
        if (this.supplier) {
          this.formSupplier.patchValue({
            num_ruc: this.supplier.num_ruc,
            business_name: this.supplier.business_name,
            fiscal_address: this.supplier.fiscal_address,
            prefix: this.supplier.phones?.[0]?.prefix? this.prefixs.find(option => option.value == this.supplier?.phones[0].prefix) : null,
            phone: this.supplier.phones?.[0]?.number ?? '',
            contac: this.supplier.contac,
          })
          const { prefix, ...rawValue } = this.formSupplier.value;
          const prefixValue = this.formSupplier.get('prefix')?.value?.value;
          const originalSupplier: updateSupplier = {
            num_ruc: rawValue.num_ruc,
            business_name:  rawValue.business_name,
            fiscal_address: rawValue.fiscal_address,
            phone: prefixValue ? [{ prefix: prefixValue, number: rawValue.phone }] : [],
            contac: rawValue.contac
          }
        console.log(originalSupplier)
        }
      },
      (error) => {
        console.log("Error al obtener los detalles de la categoría", error);
      }
    )
  }

  searchRuc() {
    const ruc = this.formSupplier.get('num_ruc')?.value;
    if (!ruc) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'RUC No digitado', life:2000 })
      return;  
    }

    if (ruc.toString().length == 11) {
      this.rucService.showRuc(ruc).subscribe({
        next: (data) => {
          if (data) {
            if (data.message && data.message === 'ruc no valido') {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'RUC No existe', life:2000 })
            } else {
              this.formSupplier.patchValue({
                business_name: data.razonSocial,
                fiscal_address: data.direccion,
              });
            }
          } else {
            this.messageService.add({ severity: 'info', summary: 'Sin datos', detail: 'No se encontraron datos para este RUC', life:2000 })
          }
        },
        error: (err) => {
          console.log('error al consultar el ruc: ', err)
        }
      })
      return;
    } else {
      this.messageService.add({ severity: 'info', summary: 'Digitos incorrectos', detail: 'Verique que sean 11 digitos', life:2000 })
      return;
    }
  }

  confirmationUpdate() {
    this.confirmationService.confirm({
      header: `¿Esta seguro que deseas editarlo?`,
      message: 'Por favor, confirme',
      accept: () => {
        this.onSubmit()
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se hizo ningun cambio', life:2000 })
      }
    })
  }
  
  onSubmit() {
    const { prefix, ...rawValue } = this.formSupplier.value;
    const prefixValue = this.formSupplier.get('prefix')?.value?.value;
    const currentValues: updateSupplier = {
      num_ruc: rawValue.num_ruc,        business_name:  rawValue.business_name,
      fiscal_address: rawValue.fiscal_address,
      phone: prefixValue ? [{ prefix: prefixValue, number: rawValue.phone }] : [],
      contac: rawValue.contac
    }
    console.log(currentValues)
  
    if (isEqual(this.originalSupplier, currentValues)) {
  this.messageService.add({
    severity: 'info',
    summary: 'Sin Cambios',
    detail: 'No se generaron cambios en el proveedor',
    life: 2000,
  });
  return;
    }
    console.log(this.originalSupplier)
    console.log(currentValues)
console.log(JSON.stringify(this.originalSupplier) === JSON.stringify(currentValues)); // false
console.log(isEqual(this.originalSupplier, currentValues)); // true

  }
}
