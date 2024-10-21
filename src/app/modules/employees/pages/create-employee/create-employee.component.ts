import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentDate } from '../../../../shared/models/employeeStore';
import { docType } from '../../../../shared/models/documentType';
import { prefix } from '../../../../shared/models/phone';
import { city, country, province, region } from '../../../../shared/models/adress';

function enumToOptions<T extends Record<string, unknown>>(enumObj: T): { label: string; value: T[keyof T] }[] {
    return Object.keys(enumObj).map(key => ({
        label: key,
        value: enumObj[key] as T[keyof T]
    }));
}

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  formEmployee: FormGroup;
  paymentDates: { label: string; value: PaymentDate } [];
  documentTypes: { label: string; value: docType } [];
  prefixs: { label: string; value: prefix }[];
  countries: { label: string; value: country }[];
  regions: { label: string; value: region }[];
  provinces: { label: string; value: province }[];
  cities: { label: string; value: string }[];
    
  constructor(private form: FormBuilder) {
    this.formEmployee = this.form.group({
      name: ['', Validators.required],
      paternal_surname: ['', Validators.required],
      maternal_surname: ['', Validators.required],
      date_of_birth: [null],
      salary: new FormControl(),
      payment_date: new FormControl<PaymentDate | null>(null),
      type: new FormControl<docType | null>(null),
      document_number: new FormControl(),
      prefix: new FormControl<prefix | null>(null),
      phone_number: new FormControl(),
      country: new FormControl<country | null>(null),
      region: new FormControl<region | null>(null),
      province: new FormControl<province | null>(null),
      city: new FormControl<string | null>(null),
      street: ['', Validators.required],
      number_street: new FormControl(),
    });

    this.paymentDates = enumToOptions(PaymentDate);
    this.documentTypes = enumToOptions(docType);
    this.prefixs = enumToOptions(prefix);
    this.countries = enumToOptions(country);
    this.regions = enumToOptions(region);
    this.provinces = enumToOptions(province);
    this.cities = [];
  }

  onProvinceChange() {
    const provinceValue = this.formEmployee.get('province')?.value?.value as province;
    if (provinceValue) {
      this.cities = enumToOptions(city[provinceValue]);
    } else {
      this.cities = [];
    }
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  formatSalary(salary: number | null): string {
    if (salary === null) return '';
    return salary.toFixed(2);
  }
  
  onSubmit() {
    const { type, prefix, document_number, phone_number, ...rawValue } = this.formEmployee.value;    
    const formattedDate = this.formatDate(rawValue.date_of_birth);
    const paymentDateValue = this.formEmployee.get('payment_date')?.value?.value;
    const documentTypeValue = this.formEmployee.get('type')?.value?.value;
    const prefixValue = this.formEmployee.get('prefix')?.value?.value;
    const formattedSalary = this.formatSalary(rawValue.salary);

    const result = {
      ...rawValue,
      date_of_birth: formattedDate,
      salary: formattedSalary,
      payment_date: paymentDateValue,
      document_types: documentTypeValue ? [{ type: documentTypeValue, number: document_number }] : [],
      phones : prefixValue ? [{ prefix: prefixValue, number: phone_number}] : [],
    };

    console.log(result);
  }
}
