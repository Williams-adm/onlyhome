import { Component, OnInit } from '@angular/core';
import { Datum, indexSuppliers } from '../../../../shared/models/supplier/supplierIndex';
import { SupplierService } from '../../../../shared/services/supplier/supplier.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrl: './suppliers-list.component.css',
  providers: [ConfirmationService, MessageService],
})
export class SuppliersListComponent implements OnInit{
  suppliersList: Datum[] = []; /* almacenamos la data */
  currentPage: number = 1; /* pagina actual */
  pageSize: number = 15; /* cantidad mostrada por pagina */
  totalRecords: number = 0; /* total de datos que existe */ 

  constructor(private supplierService: SupplierService, private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadSupplier({ first: 0, rows: 15 })
  }

  loadSupplier(event: any) {
    const page = event.first / event.rows + 1; /* calculo para solicitar el numero de la pagina */
    this.currentPage = page;
    this.pageSize = event.rows;

    this.supplierService
      .indexSuppliers(page, event.rows)
      .subscribe((data: indexSuppliers) => {
        this.suppliersList = data.data;
        this.totalRecords = data.meta.total
      },
        error => {
          console.error("Error al cargar las categorias", error)
        }
    );
  }

  confirmationOnToggleChange(supplierId: number, currentStatus: number) {
    const action = currentStatus === 1 ? 'deshabilitarlo' : 'habilitarlo';
    const action2 = currentStatus === 1 ? 'deshabilitado' : 'habilitado';
    
    this.confirmationService.confirm({
      header: `¿Esta seguro que desea ${action}?`,
      message: 'Por favor, confirme',
      accept: () => {
        this.updateSupplierStatus(supplierId, currentStatus);
        this.messageService.add({ severity: 'success', summary: 'Confirmado', detail: `El estado del proveedor ha sido ${action2}`, life:2000 })
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelado', detail: 'No se hizo ningun cambio', life:2000 })
      }
    })
  }

  updateSupplierStatus(supplierId: number, currentStatus: number): void{
    const newStatus = currentStatus === 1 ? 0 : 1;
    this.supplierService.patchSupplierStatus(supplierId, { status: newStatus })
      .subscribe(
        response => {
          const category = this.suppliersList.find(emp => emp.id === supplierId);
          if (category) {
            category.status = newStatus;
          }
        },
        error => {
          console.error('Error al actualizar el estado del proveedor', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el estado del proveedor' });
        }
      )
  }
}