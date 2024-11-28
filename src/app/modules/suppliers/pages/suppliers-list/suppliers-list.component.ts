import { Component, OnInit } from '@angular/core';
import { Datum, indexSuppliers } from '../../../../shared/models/supplier/supplierIndex';
import { SupplierService } from '../../../../shared/services/supplier/supplier.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrl: './suppliers-list.component.css'
})
export class SuppliersListComponent implements OnInit{
  suppliersList: Datum[] = []; /* almacenamos la data */
  currentPage: number = 1; /* pagina actual */
  pageSize: number = 15; /* cantidad mostrada por pagina */
  totalRecords: number = 0; /* total de datos que existe */ 

  constructor(private supplierService: SupplierService,
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

}