import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerInterface, UserInterface } from './username';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customersUrl = 'api/customers';

  constructor(private http: HttpClient) {}

  getCustomers = (): Observable<CustomerInterface[]> => {
    return this.http.get<CustomerInterface[]>(this.customersUrl);
  };

  addCustomer = (
    customerData: CustomerInterface
  ): Observable<CustomerInterface[]> => {
    return this.http.post<CustomerInterface[]>(
      this.customersUrl,
      customerData,
      this.httpOptions
    );
  };

  getCustomer = (id: number): Observable<CustomerInterface> => {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<CustomerInterface>(url);
  };

  deleteCustomer = (id: number) => {
    console.log(id);
    const url = `${this.customersUrl}/${id}`;
    return this.http.delete<CustomerInterface>(url, this.httpOptions);
  };
  updateCustomer = (customer: any): Observable<any> => {
    return this.http.put(this.customersUrl, customer, this.httpOptions);
  };
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
