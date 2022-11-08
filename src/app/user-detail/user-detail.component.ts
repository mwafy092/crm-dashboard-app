import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserInterface } from '../username';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user?: UserInterface;
  editedUser?: string = '';
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser = (): void => {
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.getUser(id).subscribe((user) => (this.user = user));
  };
  saveUser = () => {
    let editedUser = { ...this.user, username: this.editedUser };
    this.authService
      .updateUsername(editedUser)
      .subscribe((_) => this.location.back());
  };
}
