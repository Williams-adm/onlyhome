import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { paymentDate, docType } from '../../../../shared/models/employeeStore';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  formEmployee: FormGroup;
  paymentDates: { label: string, value: paymentDate }[] = [];
  docTypes: { label: string, value: docType }[] = [];

  constructor(private form: FormBuilder) {
    this.formEmployee = this.form.group({
      name: ['', Validators.required],
      paternal_surname: ['', Validators.required],
      maternal_surname: ['', Validators.required],
      date: new FormControl<Date | null>(null),
      salary: new FormControl(),
      payment_date: new FormControl<paymentDate | null>(null),
      document_type: new FormControl<docType | null>(null),
      number: new FormControl(),
      prefix: [''],
      number_phone: new FormControl(),
    });

    this.paymentDates = Object.entries(paymentDate).map(([key, value]) => ({
      label: value,
      value: value
    }));

    this.docTypes = Object.entries(docType).map(([key, value]) => ({
      label: value,
      value: value
    }));
  }
  onSubmit() {
    if (this.formEmployee.valid) {
      console.log(this.formEmployee.value);
      // Aquí puedes enviar tu formulario a la API o procesarlo según necesites
    }
  }
}
