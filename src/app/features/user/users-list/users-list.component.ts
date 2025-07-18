import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  isLoading: boolean = false;
  error: string = '';
  users: User[] = [];
  totalPages = 1;
  currentPage = 1;

  constructor(private userService: UserService, router: Router) {}

  ngOnInit(): void {}

  loadUsers(page: number = 1) {
    this.isLoading = true;

    this.userService.getUsers(page).subscribe({
      next: (response) => {
        console.log('Check listusser', response);
      },
      error: (error) => {
        console.log('Error fetching users', error);
      },
    });
  }
}
