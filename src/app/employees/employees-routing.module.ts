import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'create',
        component: NewEmployeeComponent
    },
    {
        path: 'edit/:id',
        component: NewEmployeeComponent
    },
    {
        path: 'view/:id',
        component: NewEmployeeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeesRoutingModule { }
