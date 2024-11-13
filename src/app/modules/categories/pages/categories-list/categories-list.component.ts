import { Component, OnInit } from '@angular/core';
import { Datum, indexCategories } from '../../../../shared/models/category/categoryIndex';
import { CategoryService } from '../../../../shared/services/category/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent implements OnInit{
  categoriesList: Datum[] = []; /* almacenamos la data */
  currentPage: number = 1; /* pagina actual */
  pageSize: number = 15; /* cantidad mostrada por pagina */
  totalRecords: number = 0; /* total de datos que existe */

  constructor(private categoryService: CategoryService) { }
  
  ngOnInit(): void {
    this.loadCategory({ first: 0, rows: 15 })
  }

  loadCategory(event: any) {
    const page = event.first / event.rows + 1; /* calculo para solicitar el numero de la pagina */
    this.currentPage = page;
    this.pageSize = event.rows;

    this.categoryService
      .indexCategories(page, event.rows)
      .subscribe((data: indexCategories) => {
        this.categoriesList = data.data;
        this.totalRecords = data.meta.total
      },
        error => {
          console.error("Error al cargar las categorias", error)
        }
    );
  }

  onToggleChange(categoryId: number, currentStatus: number): void{
    const newStatus = currentStatus === 1 ? 0 : 1;
    this.categoryService.patchCategories(categoryId, { status: newStatus })
      .subscribe(
        response => {
          const category = this.categoriesList.find(emp => emp.id === categoryId);
          if (category) {
            category.status = newStatus;
          }
        },
        error => {
          console.error('Error al actualizar el estado de la categoría', error)
        }
      )
  }
}
