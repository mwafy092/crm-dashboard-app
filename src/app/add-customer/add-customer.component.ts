import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { MessagesService } from '../messages.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
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
  status!: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private customersService: CustomersService,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  submitIsValid = () => {
    return (
      this.name.status === 'VALID' &&
      this.email.status === 'VALID' &&
      this.age.status === 'VALID' &&
      this.role.status === 'VALID' &&
      this.phone.status === 'VALID'
    );
  };

  ngOnInit(): void {}

  submit = (): void => {
    this.customersService
      .addCustomer(this.customerForm?.value)
      .subscribe((_) => {
        this.messagesService.addMessage('customer added successfully');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      });
  };
}
