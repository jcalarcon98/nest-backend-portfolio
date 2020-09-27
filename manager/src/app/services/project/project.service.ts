import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CreateProjectForm } from '../../interfaces/create-project-form.interface';
import { CREATE_PROJECT } from '../../operations/mutation/project/project.mutation';
import { tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private apollo: Apollo) { }

  createProject(createProjectInput: CreateProjectForm){

    const token = localStorage.getItem('token');

    return this.apollo.mutate({
      mutation: CREATE_PROJECT,
      errorPolicy: 'none',
      variables: {
        createProjectInput
      },
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer  ${token}`),
        useMultipart: true // Is nedeed for upload images
      }
    }).pipe(
      tap( ({errors, data}: {errors: any, data: any}) => {

        if (errors)  {
          console.log(errors);
          return;
        }

        console.log(data);

        const { title, description, status} = data.createProject;

        console.log('This is the title', title);
      })
    );
  }
}
