import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentSwitcherComponent } from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ComponentSwitcherComponent],
  exports: [ComponentSwitcherComponent]
})
export class ComponentSwitcherModule { }
