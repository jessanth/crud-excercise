import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit {
  form = new FormGroup({});
  id: any;
  isView: boolean = false;
  showForm: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private employeeService: EmployeesService) { }

  ngOnInit(): void {
    let params = this.route.snapshot.params;
    if (params['id']) {
      this.id = params['id'];
      this.employeeService.getEmployee(this.id).subscribe(res => {
        if (res && res.body) {
          this.initForm(res.body);
        }
      })
    } else {
      this.initForm();
    }

  }

  initForm(data?: any) {
    this.form = new FormGroup({
      "id": new FormControl(data && data.id ? data.id : ''),
      "dob": new FormControl(data && data.dob ? new Date(data.dob) : ''),
      "email": new FormControl(data && data.email ? data.email : ''),
      "phone": new FormControl(data && data.phone ? data.phone : ''),
      "gender": new FormControl(data ? (data.gender == true ? 'true' : 'false') : ''),
      "company": new FormControl(data && data.company ? data.company : ''),
      "fullName": new FormControl(data && data.fullName ? data.fullName : ''),
      "position": new FormControl(data && data.position ? data.position : ''),
    })
    if (this.router.url.split('/').includes('view')) {
      this.isView = true;
      this.form.disable();
    }
    this.showForm = true;
  }
  onBack() {
    this.router.navigateByUrl('employee/list')
  }

  onSave() {
    this.form.value.gender = this.form.value.gender == 'true' ? true : this.form.value.gender == 'false' ? false : null;

    if (this.id) {
      this.employeeService.updateEmployee(this.id, this.form.value).subscribe(res => {
        if (res) {
          Swal.fire({
            title: 'Employee Updated Successfully!',
            timer: 2000

          });
          this.router.navigateByUrl('employee/list')
        }
      })
    } else {
      this.employeeService.saveEmployee(this.form.value).subscribe(res => {
        if (res) {
          Swal.fire({
            title: 'Employee Saved Successfully!',
            timer: 2000

          });
          this.router.navigateByUrl('employee/list')
        }
      })
    }


  }

}
