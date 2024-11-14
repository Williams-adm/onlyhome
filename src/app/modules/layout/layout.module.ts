import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { TopBarComponent } from './top-bar/top-bar.component';



@NgModule({
  declarations: [
    LayoutComponent,
    MenuComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
