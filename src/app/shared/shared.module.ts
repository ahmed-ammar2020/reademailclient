import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { EmailFormComponent } from './email-form/email-form.component';

@NgModule({
  declarations: [InputComponent, ModalComponent, EmailFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [InputComponent, ModalComponent, EmailFormComponent],
})
export class SharedModule {}
