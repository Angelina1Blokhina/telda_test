import { Injectable } from '@angular/core';
import { User } from '../dataStructure';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AUTH_USER_KEY, USERS_KEY } from '../consts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storedUser = localStorage.getItem(AUTH_USER_KEY);
  authUser = new BehaviorSubject<User | null>(
    this.storedUser ? JSON.parse(this.storedUser) : null,
  );

  constructor(private router: Router) {}

  getAuthUser(): Observable<User | null> {
    return this.authUser.asObservable();
  }

  getAuthUserValue(): User | null {
    return this.authUser.value;
  }

  isAuthUser() {
    return !!this.getAuthUserValue();
  }

  registration(user: User) {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');

    if (users.find((u) => u.login === user.login)) return false;

    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    return true;
  }

  logIn(login: string, password: string) {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '');

    // eslint-disable-next-line prettier/prettier
    const user = users.find((u) => u.login === login && u.password === password);

    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

    if (user) this.authUser.next(user);

    this.router.navigate(['/home']);
  }

  logOut() {
    localStorage.removeItem(AUTH_USER_KEY);

    this.authUser.next(null);

    this.router.navigate(['/login']);
  }
}
