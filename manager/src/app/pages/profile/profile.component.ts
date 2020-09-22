import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

import Swal from 'sweetalert2';

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
   * Image if user need to change Profile Picture
   */
  newProfilePicture: File;
  tempImage: any;

  /**
   * @ignore
   */
  currentFileName = 'Select picture';

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

    this.userService.updateUser(updatedUser).subscribe(({errors, data}) => {

      if (errors){
        Swal.fire({
          title: 'Error!',
          text: errors[0].message,
          icon: 'error',
          confirmButtonText: 'Retry'
        });

        return;
      }

      // TODO improve this Swal.fire call.
      Swal.fire({
        title: 'Correct',
        text: 'Updated Profile Information',
        icon: 'success'
      });

      this.refreshCurrentUserData();
    });
  }

  /**
   * Refresh the current user information after update.
   */
  refreshCurrentUserData(){
    this.currentUser = this.userService.currentUser;
  }

  /**
   * Change the image only for visualize purpose
   * @param evt event executed when user select a new picture
   */
  onChange(evt) {

    const { files, validity } = evt.target;

    if (validity.valid) {

      this.newProfilePicture = files.item(0);

      if (this.newProfilePicture.type.indexOf('image') < 0) {
        Swal.fire({
          title: 'Error!',
          text: 'Please, select only images',
          icon: 'error',
          confirmButtonText: 'Retry'
        });
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.newProfilePicture);
      reader.onloadend = () => this.tempImage = reader.result;
    }
  }

  /**
   * Update user profile picture.
   */
  updateImage() {
    this.userService.updateUserImage(this.newProfilePicture, {idImage: this.currentUser.id}).subscribe(({errors, data}) => {
      console.log('ojito', data, errors);
    });
  }



}
