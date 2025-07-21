import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RouterModule } from '@angular/router';

import { pages } from './page';
import { components } from './components';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [...pages, ...components, UserModalComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
