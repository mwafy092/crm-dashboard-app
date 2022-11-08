import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, DoCheck {
  constructor(
    private authService: AuthService,
    private router: Router,
    private messagesService: MessagesService
  ) {}
  status?: string | null;
  ngOnInit(): void {}
  ngDoCheck(): void {
    this.getDataFromLocalStorage();
    console.log(this.status);
  }

  logout = () => {
    this.authService.logout();
    this.messagesService.addMessage('Logged Out Successfully');
    this.router.navigate(['/login']);
  };
  getDataFromLocalStorage = () => {
    this.status = localStorage.getItem('loginStatus');
  };
}
