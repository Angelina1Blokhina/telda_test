import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/dataStructure';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allUsers: User[] = [];

  displayedColumns: string[] = [
    'login',
    'name',
    'password',
    'registrationDate',
    'delete',
  ];

  authUser: User | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.allUsers = this.userService.getUsers();
    this.authUser = this.authService.getAuthUserValue();
  }

  deleteUser(user: User) {
    this.allUsers = this.userService.deleteUser(user);
  }
}
