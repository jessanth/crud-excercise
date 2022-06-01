import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class EmployeesService {
    constructor(private http: HttpClient) { }

    getAllEmployees() {
        return this.http.get('https://retoolapi.dev/DV6x5A/employees',
            { observe: 'response' });
    }
    getEmployee(id: any) {
        return this.http.get(`https://retoolapi.dev/DV6x5A/employees/${id}`,
            { observe: 'response' });
    }
    deleteEmployee(id: any) {
        return this.http.delete(`https://retoolapi.dev/DV6x5A/employees/${id}`,
            { observe: 'response' });
    }
    updateEmployee(id: any, data: any) {
        return this.http.patch(`https://retoolapi.dev/DV6x5A/employees/${id}`, data,
            { observe: 'response' });
    }
    saveEmployee(data: any) {
        return this.http.post(`https://retoolapi.dev/DV6x5A/employees`, data,
            { observe: 'response' });
    }
}