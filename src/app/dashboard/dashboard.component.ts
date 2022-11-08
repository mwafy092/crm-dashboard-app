import { Component, OnInit, DoCheck } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CustomerInterface, UserInterface } from '../username';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomersService } from '../customers.service';
import { MessagesService } from '../messages.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, DoCheck {
  customers: CustomerInterface[] = [];
  loggedInUser: string | null = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private customersService: CustomersService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.getLoggedInUser();
    this.getCustomers();
    if (localStorage.getItem('loginStatus') !== 'true') {
      this.router.navigate(['/login']);
    }
  }
  ngDoCheck(): void {
    this.getCustomers();
  }

  getCustomers = (): void => {
    this.customersService
      .getCustomers()
      .subscribe((customers) => (this.customers = customers));
  };

  getLoggedInUser = (): void => {
    this.loggedInUser = localStorage.getItem('loggedinUser');
  };

  deleteCustomer = (id: number) => {
    this.customersService.deleteCustomer(id).subscribe();
    this.messagesService.addMessage('Customer Deleted Successfully');
  };
}
