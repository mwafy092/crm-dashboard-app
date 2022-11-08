import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CustomerInterface, UserInterface } from '../username';
import { CustomersService } from '../customers.service';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit {
  customer?: CustomerInterface;
  editedCustomer?: string = '';
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private customerService: CustomersService
  ) {}
  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer = (): void => {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.customerService
      .getCustomer(id)
      .subscribe((customer) => (this.customer = customer));
  };
}
