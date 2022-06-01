import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { GenderPipe } from '../pipes/gender.pipe';
import { EmployeesRoutingModule } from './employees-routing.module';
import { ListComponent } from './list/list.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';



@NgModule({
  declarations: [
    ListComponent,
    NewEmployeeComponent,
    GenderPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EmployeesModule { }
