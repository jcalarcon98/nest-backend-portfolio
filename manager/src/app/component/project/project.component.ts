import { Component } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent{

  existsProjects: boolean;

  constructor(){
    this.existsProjects = true;
  }

  /**
   * Get user projects
   */
  getProjects(){}

}
