import { Component, OnInit } from '@angular/core';
import { ComponentSwitcherComponent } from 'src/app/modules/component-switcher/components';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  constructor(public componentsSwitcher: ComponentSwitcherComponent) { 
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    console.log('first destroyed')
  }
}
