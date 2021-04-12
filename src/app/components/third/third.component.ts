import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentSwitcherComponent } from 'src/app/modules/component-switcher/components';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements OnInit, OnDestroy {

  constructor(public componentsSwitcher: ComponentSwitcherComponent) { 
  }
  ngOnDestroy(): void {
    console.log('third destroyed')
  }

  ngOnInit() {
  }

}
