import { Injectable } from '@angular/core';
import { User } from '../dataStructure';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageKey = 'users';

  storedUser = localStorage.getItem('auth_user');
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
    const users: User[] = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '[]',
    );

    if (users.find((u) => u.login === user.login)) return false;

    users.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));

    return true;
  }

  logIn(login: string, password: string) {
    const users: User[] = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '',
    );

    // eslint-disable-next-line prettier/prettier
    const user = users.find((u) => u.login === login && u.password === password);

    localStorage.setItem('auth_user', JSON.stringify(user));

    if (user) this.authUser.next(user);

    this.router.navigate(['/home']);
  }

  logOut() {
    localStorage.removeItem('auth_user');

    this.authUser.next(null);

    this.router.navigate(['/login']);
  }
}
