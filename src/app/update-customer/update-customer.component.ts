import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerInterface } from '../username';
import { CustomersService } from '../customers.service';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css'],
})
export class UpdateCustomerComponent implements OnInit {
  customer?: CustomerInterface;
  name = new FormControl('', [Validators.required, Validators.minLength(4)]);
  age = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  role = new FormControl('', [Validators.required]);
  phone = new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11),
  ]);
  customerForm?: FormGroup | undefined | any = this.formBuilder.group({
    name: this.name,
    age: this.age,
    email: this.email,
    role: this.role,
    phone: this.phone,
  });
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private customerService: CustomersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCustomer();
  }
  getCustomer = (): void => {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.customerService.getCustomer(id).subscribe((customer) => {
      this.customer = customer;
      this.customerForm.controls['name'].setValue(this.customer.name);
      this.customerForm.controls['age'].setValue(this.customer.age);
      this.customerForm.controls['email'].setValue(this.customer.email);
      this.customerForm.controls['role'].setValue(this.customer.role);
      this.customerForm.controls['phone'].setValue(this.customer.phone);
    });
  };
  saveUser = () => {
    let editedCustomer = { id: this.customer?.id, ...this.customerForm.value };
    this.customerService
      .updateCustomer(editedCustomer)
      .subscribe((_) => this.location.back());
  };
}
