import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentSwitcherComponent } from './components';
import { ComponentSwitcherDirective } from './directives';

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentSwitcherComponent, ComponentSwitcherDirective],
  exports: [ComponentSwitcherComponent, ComponentSwitcherDirective],
})
export class ComponentSwitcherModule {}
