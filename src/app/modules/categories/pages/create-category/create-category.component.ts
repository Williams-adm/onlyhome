import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
  providers: [MessageService]
})
export class CreateCategoryComponent {
  formCategory: FormGroup;

  constructor(private form: FormBuilder, private categoryService: CategoryService, private messageService: MessageService) {
    this.formCategory = this.form.group({
      name: ['', Validators.required],
      description: ['']
    })
  }
  
  onSubmit() {
    if (this.formCategory.valid) {
      this.categoryService.storeCategories(this.formCategory.value).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: `La categoria ${this.formCategory.value.name} ha sido creada`, life:2000 })
          this.formCategory.reset()
        },
        (error) => {
          console.error('Error al crear el cliente: ', error);
        }
      );
    } else {
      /* console.log('Formulario no válido') */
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Formulario no válido', life:2000 })
    }
  }
}