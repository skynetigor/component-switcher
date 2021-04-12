import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentSwitcherComponent } from './components';
import {LazyComponentDirective} from './directives'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ComponentSwitcherComponent, LazyComponentDirective],
  exports: [ComponentSwitcherComponent]
})
export class ComponentSwitcherModule { }
