import { Component, OnInit } from '@angular/core';
import { Data, showCategory } from '../../../../shared/models/category/categoryShow';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
  providers: [MessageService]
})
export class EditCategoryComponent implements OnInit{
  category: Data | null = null;
  categoryId: number = 0;
  formCategory: FormGroup;
  originalCategory: Data | null = null;
  
  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private form: FormBuilder) { 
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
        }
      },
      (error) => {
        console.log("Error al obtener los detalles de la categoría", error);
      }
    )
  }

  onSubmit() {
    console.log(this.formCategory.value)
  }
}
