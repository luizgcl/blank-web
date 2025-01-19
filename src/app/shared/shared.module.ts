import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, CurrencyPipe],
  exports: [CommonModule, CurrencyPipe],
})
export class SharedModule {}
