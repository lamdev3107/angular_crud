import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SharedInputComponent } from './components/shared-input/shared-input.component';
import { HeaderComponent } from './layouts/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    SharedInputComponent,
    HeaderComponent,
    ModalComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    MainLayoutComponent,
    SharedInputComponent,
    ModalComponent,
    LoadingComponent,
  ],
})
export class SharedModule {}
