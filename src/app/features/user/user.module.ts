import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UsersListComponent],
  imports: [CommonModule, UserRoutingModule, RouterModule],
})
export class UserModule {}
