import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {
  @Input() user!: User;
  @Output() viewUser = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<number>();
  @Output() deleteUser = new EventEmitter<number>();

  get fullName(): string {
    return `${this.user.first_name} ${this.user.last_name}`;
  }

  get avatarUrl(): string {
    return this.user.avatar || 'assets/images/default-avatar.png';
  }

  onView(): void {
    this.viewUser.emit(this.user.id);
  }

  onEdit(): void {
    this.editUser.emit(this.user.id);
  }

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }
}
