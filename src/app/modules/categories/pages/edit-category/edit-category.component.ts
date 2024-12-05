import { Component, OnInit } from '@angular/core';
import { Data, showCategory } from '../../../../shared/models/category/categoryShow';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { updateCategory } from '../../../../shared/models/category/categoryUpdate';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
  providers: [ConfirmationService, MessageService]
})
  
export class EditCategoryComponent implements OnInit {
  category: Data | null = null;
  categoryId: number = 0;
  formCategory: FormGroup;
  originalCategory: Partial<updateCategory> = {}
  
  constructor(private categoryService: CategoryService, private route: ActivatedRoute,
    private form: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService,) { 
    this.formCategory = this.form.group({
      name: ['', Validators.required],
      description: ['']
    })
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('id'));
      this.showCategoryDetails(this.categoryId)
    })
  }

  showCategoryDetails(id: number): void {
    this.categoryService.showCategory(id).subscribe(
      (data: showCategory) => {
        this.category = data.data
        this.originalCategory = { ...this.category}
        if (this.category) {
          this.formCategory.patchValue({
            name: this.category.name,
            description: this.category.description
          })
          this.originalCategory = this.formCategory.getRawValue();
        }
      },
      (error) => {
        console.log("Error al obtener los detalles de la categoría", error);
      }
    )
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
    const currentValues: updateCategory = this.formCategory.getRawValue();
    if (JSON.stringify(this.originalCategory) === JSON.stringify(currentValues)) {
      this.messageService.add({ severity: 'info', summary: 'Sin Cambios', detail: 'No se generaron cambios en la categoria', life:2000 })
      return
    }

    const updatedForm: Partial<updateCategory> = {};
    
    Object.keys(currentValues).forEach((key) => {
      if (this.originalCategory[key as keyof updateCategory] !== currentValues[key as keyof updateCategory]) {
        updatedForm[key as keyof updateCategory] = currentValues[key as keyof updateCategory];
      }
    })

    if (Object.keys(updatedForm).length === Object.keys(this.originalCategory).length) {
      this.categoryService.updateCategories(this.categoryId, currentValues).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Se ha actualizado la categoría', life:2000 })
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar la categoría', life:2000 })
          console.log('Error al actualizar la categoría con PUT', error)
        }
      )
    } else {
      this.categoryService.patchCategories(this.categoryId, updatedForm).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: 'Se ha actualizado la categoría', life:2000 })
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar la categoría', life:2000 })
          console.log('Error al actualizar la categoría con PATCH', error);
        }
      )
    }
  }
}
