import { Injectable } from '@angular/core';
import { User } from '../dataStructure';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private localStorageKey = 'users';
  users: User[] = [];

  getUsers(): User[] {
    this.users = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
    return this.users;
  }

  deleteUser(user: User) {
    this.users = this.users.filter((u) => u !== user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return this.users;
  }
}
