import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ComponentSwitcherComponent } from 'src/app/modules/component-switcher/components';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements OnInit, OnDestroy {
  @HostBinding('class.inverted')
  private invertable: boolean;

  constructor(public componentsSwitcher: ComponentSwitcherComponent) { 
  }
  ngOnDestroy(): void {
    console.log('third destroyed')
  }

  ngOnInit() {
  }

  click() {
    this.invertable = !this.invertable;
  }

}
