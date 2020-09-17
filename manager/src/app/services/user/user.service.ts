import { Apollo } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UPDATE_USER, UPDATE_USER_IMAGE } from '../../operations/mutation/user/user.mutation';
import { UpdateUserForm } from '../../interfaces/update-user-form.interface';
import { UpdateImageForm } from '../../interfaces/update-image.interface';
import { User } from '../../models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;

  constructor(private apollo: Apollo) {
    this.loadDataFromStorage();
  }

  updateUser(updateUserInput: UpdateUserForm): any{

    const token = localStorage.getItem('token');

    return this.apollo.mutate({
      mutation: UPDATE_USER,
      errorPolicy: 'all',
      variables: {
        updateUserInput
      },
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer  ${token}`)
      }
    }).pipe(
      tap( ({errors, data }: {errors: any, data: any}) => {

        if (errors) { return; }

        const {
          firstNames,
          lastNames,
          country,
          city,
          description,
          address,
        } = data.updateUser;

        this.currentUser.firstNames = firstNames;
        this.currentUser.lastNames = lastNames;
        this.currentUser.country = country;
        this.currentUser.city = city;
        this.currentUser.description = description;
        this.currentUser.address = address;

        localStorage.setItem('user', JSON.stringify(this.currentUser));
      })
    );
  }

  updateUserImage(picture, updateImageInput: UpdateImageForm): any{

    const formData: FormData = new FormData();

    formData.append('picture', picture, picture.name);

    const token = localStorage.getItem('token');

    return this.apollo.mutate({
      mutation: UPDATE_USER_IMAGE,
      errorPolicy: 'all',
      variables: {
        picture,
        updateImageInput
      },
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer  ${token}`),
        useMultipart: true // Is nedeed for upload images
      }
    }).pipe(
      tap(({errors, data }: {errors: any, data: any}) => {

        if (errors) { return; }

        const {updateUserImage} = data;

        this.currentUser.image = updateUserImage;

        localStorage.setItem('user', JSON.stringify(this.currentUser));
      })
    );
  }

  loadDataFromStorage(){
    const isUserOnStorage = localStorage.getItem('user');

    if (!isUserOnStorage) {
      // TODO redirect to Login
      return;
    }

    this.currentUser = JSON.parse(isUserOnStorage);
  }

}
