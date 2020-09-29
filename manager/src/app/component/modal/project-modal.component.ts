import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import { ProjectService } from '../../services/project/project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent{

  /**
   * Image if user need to change Profile Picture
   */
  newProjectPicture: File;

  /**
   * @ignore
   */
  currentFileName = 'Select file';

  /**
   * Permit change modal header with the current operations
   *
   * Operations allowed: Update or Create
   */
  @Input() public projectOperation: string;

  projecForm: FormGroup;

  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private projectService: ProjectService
  ){
    this.initReactiveForm();
  }

  // TODO create pipe and delete this method
  getImage(): string{
    return `http://localhost:4000/api/users/`;
  }


  initReactiveForm(){
    this.projecForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      status: ['', Validators.required],
    });
  }

  dismiss(){
    this.modal.dismiss();
  }

  saveProject(){

    Swal.fire({
      title: 'Do you want to save the changes?',
      showCancelButton: true,
      confirmButtonText: `Save Project`
    }).then((result) => {

      if (result.isConfirmed) {

        this.projectService.createProject(this.projecForm.value, this.newProjectPicture).subscribe(({errors, data}) => {

          if (errors) {
            Swal.fire('Changes are not saved', '', 'info');
          }

          this.modal.close();
        });

      }

      return;
    });
  }

  /**
   * Update user profile picture.
   */
  updateProjectImage(newProjectPicture: File) {
    this.newProjectPicture = newProjectPicture;
    console.log(newProjectPicture);
  }

}
