import { Component, OnInit } from '@angular/core';
import { ComponentSwitcherComponent } from 'src/app/modules/component-switcher/components';
import { ComponentSwitcherDirective } from 'src/app/modules/component-switcher/directives';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  constructor(public componentsSwitcher: ComponentSwitcherDirective) { 
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    console.log('second destroyed')
  }
}
