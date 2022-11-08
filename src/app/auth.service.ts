import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from './username';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usernamesUrl = 'api/usernames';
  constructor(private http: HttpClient) {}
  getUsers = (): Observable<UserInterface[]> => {
    return this.http.get<UserInterface[]>(this.usernamesUrl);
  };
  getUser = (id: number): Observable<UserInterface> => {
    const url = `${this.usernamesUrl}/${id}`;
    return this.http.get<UserInterface>(url);
  };

  /**
   *
   * Add User Functionality through register and dashboard
   */
  addUser = (userData: UserInterface): Observable<UserInterface[]> => {
    return this.http.post<UserInterface[]>(
      this.usernamesUrl,
      userData,
      this.httpOptions
    );
  };

  /**
   *
   * Set Session Storage with login status
   * Emulation to backend
   */
  setSessionLog = (status: boolean, user: UserInterface) => {
    window.localStorage.setItem('loginStatus', `${status}`);
    window.localStorage.setItem('loggedinUser', `${user.username}`);
    let cookieData = status + new Date().toDateString() + 'delta';
    document.cookie = btoa(cookieData);
  };

  /**
   *
   * Check for user inside our In Memory DB
   */
  checkUser = (userData: UserInterface): any => {
    return this.getUsers().subscribe((users) => {
      users.map((user) =>
        this.setSessionLog(
          user.email === userData.email && user.password === userData.password,
          user
        )
      );
    });
  };

  logout = (): void => {
    localStorage.setItem('loginStatus', 'false');
    localStorage.setItem('loggedinUser', '');
  };

  deleteUser = (id: number) => {
    const url = `${this.usernamesUrl}/${id}`;
    return this.http.delete<UserInterface>(url, this.httpOptions);
  };
  updateUsername = (user: any): Observable<any> => {
    return this.http.put(this.usernamesUrl, user, this.httpOptions);
  };
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
}
