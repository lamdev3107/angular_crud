import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/features/user/service/user.service';

import { User, UserResponse } from 'src/app/features/user/model/user.model';
import { AuthService } from 'src/app/features/auth/service/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  private loadingSubscription!: Subscription; // Biến để lưu trữ đăng ký

  users: User[] = [];
  currentPage = 1;
  totalPages = 1;
  isLoading = false;

  isOpenModal = false;
  modalTitle = '';
  isEditing = false;
  selectedUserId: number | null = null;
  selectedUser: User | null = null;

  constructor(
    private userService: UserService,
    private loadingService: LoadingService
  ) {}

  getUserInfo(selectedUserId: number): void {
    this.loadingService.show();
    this.userService.getUserById(selectedUserId).subscribe({
      next: (user) => {
        this.selectedUser = user.data;
      },
      error: (error) => {
        console.log('error', error);
      },
      complete: () => {
        this.loadingService.hide();
      },
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadingSubscription = this.loadingService.loading$.subscribe(
      (loading) => {
        this.isLoading = loading.isLoading;
      }
    );
  }

  clearUserForm(): void {
    this.isEditing = false;
    this.selectedUser = null;
  }

  loadUsers(page: number = 1): void {
    this.loadingService.show();
    this.userService.getUsers(page).subscribe({
      next: (response: UserResponse) => {
        this.users = response.data;
        this.currentPage = response.page;
        this.totalPages = response.total_pages;
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error fetching user list', error);
      },
      complete: () => {
        this.loadingService.hide();
      },
    });
  }

  handleClickViewUserBtn(id: number): void {
    this.clearUserForm();
    this.getUserInfo(id);
    this.isOpenModal = true;
    this.modalTitle = 'Chi tiết người dùng';
  }

  handleClickEditUserBtn(id: number): void {
    this.clearUserForm();
    this.selectedUserId = id;
    this.isEditing = true;
    this.getUserInfo(id);
    this.isOpenModal = true;
    this.modalTitle = 'Chỉnh sửa người dùng';
  }

  handelClickDeleteUserBtn(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
      this.userService.deleteUser(id).subscribe({
        next: (res) => {
          alert('Xóa người dùng thành công!');
          const deletedUserList = this.users.filter((user) => user.id !== id);
          this.users = deletedUserList;
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        },
      });
    }
  }

  handleClickAddUserBtn(): void {
    this.clearUserForm();
    this.isOpenModal = true;
    this.modalTitle = 'Thêm người dùng';
  }

  handleAddUser(user: User): void {
    this.users.unshift(user);
  }

  handleEditUser(userData: any): void {
    // this.users.unshift(user);
    const updatedUsers = this.users.map((user) => {
      if (user.id === userData.userId) {
        return { ...user, ...userData.data };
      }
      // Nếu không, trả về user gốc
      return user;
    });
    this.users = updatedUsers;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadUsers(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadUsers(this.currentPage - 1);
    }
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  onCloseModal() {
    this.isOpenModal = false;
  }
}
