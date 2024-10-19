import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentDate } from '../../../../shared/models/employeeStore';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  formEmployee: FormGroup;
  paymentDates: { label: string; value: PaymentDate } [];

  constructor(private form: FormBuilder) {
    this.formEmployee = this.form.group({
      name: ['', Validators.required],
      paternal_surname: ['', Validators.required],
      maternal_surname: ['', Validators.required],
      date_of_birth: [null],
      salary: new FormControl(),
      payment_date: new FormControl<PaymentDate | null>(null),
      /* document_type: new FormControl<docType | null>(null),
      number: new FormControl(),
      prefix: [''],
      number_phone: new FormControl(), */
    });

    this.paymentDates = [
            { label: 'Fin De Mes', value: PaymentDate.fin_de_mes },
            { label: 'Quincenal', value: PaymentDate.Quincenal },
            { label: 'Semanal', value: PaymentDate.Semanal },
    ];
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  onSubmit() {
    const rawValue = this.formEmployee.value;        
    const formattedDate = this.formatDate(rawValue.date_of_birth);
    const paymentDateValue = this.formEmployee.get('payment_date')?.value?.value;;
      const result = {
        ...rawValue,
        date_of_birth: formattedDate,
        payment_date: paymentDateValue
      };
    console.log(result);
  }
}
