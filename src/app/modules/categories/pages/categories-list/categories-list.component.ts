import { Component, OnInit } from '@angular/core';
import { Datum, indexCategories } from '../../../../shared/models/category/categoryIndex';
import { CategoryService } from '../../../../shared/services/category/category.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
  providers: [ConfirmationService, MessageService],
})
  
export class CategoriesListComponent implements OnInit{
  categoriesList: Datum[] = []; /* almacenamos la data */
  currentPage: number = 1; /* pagina actual */
  pageSize: number = 15; /* cantidad mostrada por pagina */
  totalRecords: number = 0; /* total de datos que existe */

  constructor(private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  
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

  confirmationOnToggleChange(categoryId: number, currentStatus: number) {
    const action = currentStatus === 1 ? 'deshabilitarlo' : 'habilitarlo';
    const action2 = currentStatus === 1 ? 'deshabilitado' : 'habilitado';
    
    this.confirmationService.confirm({
      header: `¿Esta seguro que desea ${action}?`,
      message: 'Por favor, confirme',
      accept: () => {
        this.updateCategoryStatus(categoryId, currentStatus);
        this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: `El estado del empleado ha sido ${action2}`, life:2000 })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se hizo ningun cambio', life:2000 })
      }
    })
  }

  updateCategoryStatus(categoryId: number, currentStatus: number): void{
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
          console.error('Error al actualizar el estado de la categoría', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el estado de la categoría' });
        }
      )
  }

  onCategoryCreated(newCategory: Datum) {
    if (this.categoriesList.length < this.pageSize) {
      this.categoriesList = [newCategory, ...this.categoriesList]; // Agregar a la lista actual
    }
    this.totalRecords += 1; // Actualizar el total del paginador
  }

}
