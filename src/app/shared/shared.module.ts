import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [AppRoutingModule, CommonModule],
})
export class SharedModule {}
