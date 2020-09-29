import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CreateProjectForm } from '../../interfaces/create-project-form.interface';
import { CREATE_PROJECT } from '../../operations/mutation/project/project.mutation';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { CreateProjectParams } from '../../interfaces/create-project-params.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private apollo: Apollo) { }

  /**
   * Allows to create a new Project.
   * @param picture the project puctire.
   * @param createProjectInput a interface with the needed params to create
   * new project.
   */
  createProject(
    createProjectInput: CreateProjectForm,
    picture: File
  ){

    const variables: CreateProjectParams = {
      createProjectInput
    };

    if (picture){
      variables.picture = picture;
    }

    const token = localStorage.getItem('token');

    return this.apollo.mutate({
      mutation: CREATE_PROJECT,
      variables,
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer  ${token}`),
        useMultipart: true // Is nedeed for upload images
      }
    }).pipe(
      tap(({errors, data}: {errors: any, data: any}) => {

        if (errors)  {
          console.log(errors);
          return;
        }

        console.log(data);

        const { title, description, status, image} = data.createProject;

        console.log('This is the title', title, image);
      })
    );
  }
}
