import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements AfterViewInit {

  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(public router: Router){}

  ngAfterViewInit() {}
}
