import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentDate } from '../../../../shared/models/employeeStore';
import { docType } from '../../../../shared/models/documentType';
import { prefix } from '../../../../shared/models/phone';
import { city, country, province, region } from '../../../../shared/models/adress';
import { employDoc } from '../../../../shared/models/employeeDocument';

/* funcion para transformar y acceder a los enum, usados en los modelos ->para los dropdown */
function enumToOptions<T extends Record<string, unknown>>(enumObj: T): { label: string; value: T[keyof T] }[] {
  return Object.keys(enumObj).map(key => ({
    label: key,
    value: enumObj[key] as T[keyof T]
  }));
}

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
  
export class CreateEmployeeComponent {
  formEmployee: FormGroup;
  selectedPhoto: File[] = [];
  paymentDates: { label: string; value: PaymentDate } [];
  documentTypes: { label: string; value: docType } [];
  prefixs: { label: string; value: prefix }[];
  countries: { label: string; value: country }[];
  regions: { label: string; value: region }[];
  provinces: { label: string; value: province }[];
  cities: { label: string; value: string }[];
  documentTypesEmployees: { label: string; value: employDoc }[];
  selectedDocument: File[] = [];

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
      email: ['', Validators.required],
      password: ['', Validators.required],
      document_type_employ: new FormControl<employDoc | null>(null),
    });

    this.paymentDates = enumToOptions(PaymentDate);
    this.documentTypes = enumToOptions(docType);
    this.prefixs = enumToOptions(prefix);
    this.countries = enumToOptions(country);
    this.regions = enumToOptions(region);
    this.provinces = enumToOptions(province);
    this.cities = [];
    this.documentTypesEmployees = enumToOptions(employDoc);
  }

  /* formateador de fecha */
  formatDate(date: Date | null): string {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  /* formateador a decimal en cadena */
  formatSalary(salary: number | null): string {
    if (salary === null) return '';
    return salary.toFixed(2);
  }

  /* alternar segun la provincia escogida que salga la ciudad */
  onProvinceChange() {
    const provinceValue = this.formEmployee.get('province')?.value?.value as province;
    if (provinceValue) {
      this.cities = enumToOptions(city[provinceValue]);
    } else {
      this.cities = [];
    }
  }

  /* Para la subida de imagenes de foto del empleado */
  onImageSelect(event: { files: File[] }) {
    this.selectedPhoto = Array.from(event.files);
    for (const file of event.files) {
      if (!this.selectedPhoto.includes(file)) {
        this.selectedPhoto.push(file);
      }
    }
  }
  onImageRemove(event: any) {
    const removedFile = event.file;
    this.selectedPhoto = this.selectedPhoto.filter(file => file.name !== removedFile.name);
  }

  /* Para la subida de documentos externos del empleado */
  onFileSelect(event: { files: File[] }) {
    this.selectedDocument = Array.from(event.files);
    
  }
  onFileRemove(event: any) {
    const removedFile = event.file;
    this.selectedDocument = this.selectedDocument.filter(file => file.name !== removedFile.name);
  }

  onSubmit() {
    const { type, prefix, country, region, province, city, document_number, phone_number, street, number_street, email, password, files, document_type_employ, ...rawValue } = this.formEmployee.value;
    const formattedDate = this.formatDate(rawValue.date_of_birth);
    const formattedSalary = this.formatSalary(rawValue.salary);
    const paymentDateValue = this.formEmployee.get('payment_date')?.value?.value;
    const documentTypeValue = this.formEmployee.get('type')?.value?.value;
    const prefixValue = this.formEmployee.get('prefix')?.value?.value;
    const countryValue = this.formEmployee.get('country')?.value?.value;
    const regionValue = this.formEmployee.get('region')?.value?.value;
    const provinceValue = this.formEmployee.get('province')?.value?.value;
    const cityValue = this.formEmployee.get('city')?.value?.value;
    const employeeDocValue = this.formEmployee.get('document_type_employ')?.value?.value;

    const result = {
      ...rawValue,
      date_of_birth: formattedDate,
      salary: formattedSalary,
      photo_path: this.selectedPhoto,
      payment_date: paymentDateValue,
      document_types: documentTypeValue ? [{ type: documentTypeValue, number: document_number }] : [],
      phones: prefixValue ? [{ prefix: prefixValue, number: phone_number }] : [],
      addresses: countryValue ? [{ country: countryValue, region: regionValue, province: provinceValue, city: cityValue, street: street, number: number_street }] : [],
      user: email ? { email: email, password: password } : {},
      employee_documents: employeeDocValue ? [{ document_type: employeeDocValue, document_path: this.selectedDocument}] : []
    };

    console.log(result);
  }
}
