import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ChartsComponent } from './charts/charts.component';
import { PieCategoryComponent } from './charts/pie-category/pie-category.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatTableExporterModule } from 'mat-table-exporter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
 
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';




const routes: Routes = [
  {path: 'table', component: TableComponent},
  {path: '',component: TableComponent},
  {path: 'charts', component: ChartsComponent},

];



@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    HeaderComponent,
    ChartsComponent,
    PieCategoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    MatTableExporterModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule

  
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
