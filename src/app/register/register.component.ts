import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UserInterface } from '../username';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.minLength(4),
    Validators.required,
  ]);
  registerForm?: FormGroup | undefined | any = this.formBuilder.group({
    username: this.username,
    email: this.email,
    password: this.password,
  });
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private messageService: MessagesService
  ) {}

  submitIsValid = () => {
    return (
      this.username.status === 'VALID' &&
      this.email.status === 'VALID' &&
      this.password.status === 'VALID'
    );
  };
  ngOnInit(): void {}

  // Submit data to the fake server using angular in memory data service
  submit = (): void => {
    this.authService.addUser(this.registerForm?.value).subscribe((_) => {
      this.messageService.addMessage('User registered successfully');
      this.router.navigate(['/login']);
    });
  };
}
