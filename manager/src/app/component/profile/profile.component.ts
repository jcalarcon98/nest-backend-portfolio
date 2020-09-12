import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Usuario } from '../../models/usuario.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  imagenSubir: any;
  imagenTemp: any;

  currentFileName = 'Select picture';

  updateUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
  ) {
    this.currentUser = this.loginService.currentUser;
    this.initReactiveForm();
  }

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

  ngOnInit(): void {}

  updateCurrentUser(){
    const updatedUser = this.updateUserForm.value;
    delete updatedUser.email;
    this.userService.updateUser(updatedUser).subscribe(({errors, data}) => {
      console.log('ojito', data, errors);
    });
  }

  seleccionImagen(eded){}
  canbiarImagen(){}


}
