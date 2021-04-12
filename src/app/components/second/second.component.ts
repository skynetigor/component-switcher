import { Component, OnInit } from '@angular/core';
import { ComponentSwitcherComponent } from 'src/app/modules/component-switcher/components';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  constructor(public componentsSwitcher: ComponentSwitcherComponent) { 
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    console.log('second destroyed')
  }
}
