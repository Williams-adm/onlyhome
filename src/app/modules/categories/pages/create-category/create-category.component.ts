import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../shared/services/category/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  maskStyle = {
    'position': 'absolute',
  }
  visible: boolean = false;
  formCategory: FormGroup;
  
  showdialog() {
    this.visible = true
  }

  constructor(private form: FormBuilder, private categoryService: CategoryService) {
    this.formCategory = this.form.group({
      name: ['', Validators.required],
      description: ['']
    })
  }
  
  onSubmit() {
    if (this.formCategory.valid) {
      this.categoryService.storeCategories(this.formCategory.value).subscribe(
        (response) => {
          console.log(response)
          this.formCategory.reset()
        },
        (error) => {
          console.error('Error al crear el cliente: ', error);
        }
      );
    } else {
      console.log('Formulario no válido')
    }
  }
}