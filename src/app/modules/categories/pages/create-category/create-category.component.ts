import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private form: FormBuilder) {
    this.formCategory = this.form.group({
      
    })
  }
  

}
