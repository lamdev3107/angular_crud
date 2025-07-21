import {
  Component,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  @Input() isEditing: boolean = false;
  @Input() selectedUser: User | null = null;
  @Input() selectedUserId: number | null = null;
  @Output() closeModalEvent = new EventEmitter();
  @Output() addUserDataEvent = new EventEmitter<User>();
  @Output() editUserDataEvent = new EventEmitter<any>();
  // @Output() deleteUserData = new EventEmitter<>()

  userForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private userService: UserService) {}

  onSubmit() {
    if (this.userForm.valid) {
      const formUser = {
        email: this.userForm.get('email')?.value,
        first_name: this.userForm.get('first_name')?.value,
        last_name: this.userForm.get('last_name')?.value,
      };
      if (!this.isEditing) {
        this.userService.createUser(formUser).subscribe({
          next: (res) => {
            const newUser = res;
            alert('Thêm mới người dùng thành công!');
            this.addUserDataEvent.emit(newUser);
            this.closeModalEvent.emit();
            this.userForm.reset();
          },
          error: (err) => {
            console.log('error', err);
          },
        });
      } else {
        this.userService
          .updateUser(this.selectedUser?.id as number, formUser)
          .subscribe({
            next: (res) => {
              this.userForm.reset();
              this.editUserDataEvent.emit({
                userId: this.selectedUser?.id,
                data: res,
              });
              this.closeModalEvent.emit();
            },
            error: (err) => {
              console.log('error updating user', err);
            },
          });
      }
      return;
    }
    this.userForm.markAllAsTouched();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      this.userForm.patchValue(changes['selectedUser'].currentValue);
    } else {
      this.userForm.reset();
    }
  }

  ngOnInit(): void {
    this.userForm.reset();
  }
}
