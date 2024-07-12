import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/dataStructure';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  authUser: Observable<User | null> | undefined;

  constructor(private authService: AuthService) {
    this.authUser = this.authService.getAuthUser();
  }

  logOut() {
    this.authService.logOut();
  }
}
