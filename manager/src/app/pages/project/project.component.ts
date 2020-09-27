import { Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectModalComponent } from '../../component/modal/project-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent{

  existsProjects: boolean;
  projectOperation: string;

  constructor(
    public modalService: NgbModal
  ){
    this.existsProjects = true;
  }

  /**
   * Get user projects
   */
  getProjects(){}

  createProject(): void {
    this.projectOperation = 'Create new project';
    this.callModalComponent();
  }

  editProject(event: boolean, numero: number): void {
    this.projectOperation = 'Edit project';
    this.callModalComponent();
  }


  callModalComponent(){
    const projectModalReference = this.modalService.open(ProjectModalComponent);
    projectModalReference.componentInstance.projectOperation = this.projectOperation;
  }

  deleteProject(event: boolean): void{
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }
}
