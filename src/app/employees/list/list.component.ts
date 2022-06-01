import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import Swal from 'sweetalert2'
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['dob', 'email', 'phone', 'gender', 'company', 'full_name', 'position', 'actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private employeeService: EmployeesService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    this.employeeService.getAllEmployees().subscribe((res: any) => {
      if (res) {
        this.dataSource = new MatTableDataSource(res.body);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onAddNew() {
    this.router.navigateByUrl('employee/create')
  }

  onEdit(id: any) {
    this.router.navigateByUrl(`employee/edit/${id}`)
  }
  onView(id: any) {
    this.router.navigateByUrl(`employee/view/${id}`)
  }
  onDelete(data: any) {
    Swal.fire({
      title: `Do you want to delete "${data.fullName}" record?`,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(data.id).subscribe(res => {
          Swal.fire('Deleted Successfully', '', 'success');
          this.loadList();
        })

      }
    })
  }
}


