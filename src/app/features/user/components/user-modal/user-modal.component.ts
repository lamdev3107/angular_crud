import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  userForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private userService: UserService) {}

  onSubmit() {
    console.log(this.userForm.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser']) {
      console.log('selectedUser', this.selectedUser);
      this.userForm.patchValue(this.selectedUser as User);
    }
    if (changes['isEditing'] && changes['isEditing'].currentValue) {
      console.log('isEditing change', this.isEditing);
    }
  }

  ngOnInit(): void {
    console.log('isEditing', this.isEditing);
    this.userForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
}
