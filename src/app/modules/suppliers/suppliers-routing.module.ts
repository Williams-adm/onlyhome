import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout/layout.component';
import { SuppliersListComponent } from './pages/suppliers-list/suppliers-list.component';
import { CreateSupplierComponent } from './pages/create-supplier/create-supplier.component';
import { EditSupplierComponent } from './pages/edit-supplier/edit-supplier.component';
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: SuppliersListComponent },
      { path: 'create', component: CreateSupplierComponent },
      { path: 'edit/:id', component: EditSupplierComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
