import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  status!: string | null;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  checkAndValidate = (): void => {
    let status = localStorage.getItem('loginStatus');
    this.status = status;
    if (status === 'true') {
      this.messagesService.addMessage('Logged In Successfully');
      this.router.navigate(['/']);
    }
    if (status !== 'true') {
      this.messagesService.addMessage('Not Valid Login Information');
    }
  };

  submit = (): void => {
    this.status = this.authService.checkUser(this.form.getRawValue());
    setTimeout(() => {
      this.checkAndValidate();
    }, 1000);
  };
}
