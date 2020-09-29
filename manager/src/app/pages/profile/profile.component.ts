import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

import Swal from 'sweetalert2';
import { GraphQLError } from 'graphql';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  /**
   * Currently logged user
   */
  currentUser: User;

  /**
   * @ignore
   */
  updateUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ){
    this.refreshCurrentUserData();
    this.initReactiveForm();
  }

  /**
   * Init Reactive form for update user information
   */
  initReactiveForm(){
    this.updateUserForm = this.formBuilder.group({
      firstNames: [this.currentUser.firstNames, [Validators.required, Validators.minLength(3)]],
      lastNames: [this.currentUser.lastNames, Validators.required],
      description: [this.currentUser.description, Validators.required],
      country: [this.currentUser.country, Validators.required],
      city: [this.currentUser.city, Validators.required],
      address: [this.currentUser.address, Validators.required],
      email: [this.currentUser.email, [Validators.required, Validators.email]],
    });
  }

  // TODO create pipe and delete this method
  getImage(): string{
    return `http://localhost:4000/api/users/${this.currentUser.image}`;
  }


  /**
   * Update current user information with the values in the above reactiveForm
   */
  updateCurrentUser(){

    const {email, ...updatedUser} = this.updateUserForm.value;

    this.userService.updateUser(updatedUser).subscribe(() => {

      Swal.fire({
        title: 'Correct',
        text: 'Updated Profile Information',
        icon: 'success'
      });

      this.refreshCurrentUserData();
    },
    ({graphQLErrors}: {graphQLErrors: GraphQLError[]}) => {

      let errors: string = 'The next errors happened:<br>';

      graphQLErrors.forEach(({message}, index) => {
        errors += `${index + 1}. ${message}<br>`;
      });

      Swal.fire({
        title: 'Error!',
        html: errors,
        icon: 'error',
        confirmButtonText: 'Retry'
      });

    });
  }

  /**
   * Update user profile picture.
   * @param newProfilePicture the new profile picture
   */
  updateUserImage(newProfilePicture: File) {
    this.userService.updateUserImage(newProfilePicture, {idImage: this.currentUser.id}).subscribe(() => {

      Swal.fire({
        title: 'Correct',
        text: 'Updated Profile Information',
        icon: 'success'
      });

      this.refreshCurrentUserData();

    },
    ({graphQLErrors}: {graphQLErrors: GraphQLError[]}) => {

      let errors: string = 'The next errors happened:<br>';

      graphQLErrors.forEach(({message}, index) => {
        errors += `${index + 1}. ${message}<br>`;
      });

      Swal.fire({
        title: 'Error!',
        html: errors,
        icon: 'error',
        confirmButtonText: 'Retry'
      });
    });
  }

  /**
   * Refresh the current user information after update.
   */
  refreshCurrentUserData(){
    this.currentUser = this.userService.currentUser;
  }

}
