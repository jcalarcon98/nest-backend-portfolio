import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GraphQLError } from 'graphql';
import { RegisterService } from '../../services/auth/register.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  // TODO check if this variables helps something
  public isformSubmitted = false;

  public registerForm = this.formBuilder.group({
    firstNames: ['Jean Carlos', [Validators.required, Validators.minLength(3)]],
    lastNames: ['Alarcón Ochoa', Validators.required],
    email: ['jeancalarcon98@gmail.com', [Validators.required, Validators.email]],
    country: ['Ecuador', Validators.required],
    city: ['Loja', Validators.required],
    password: ['Dellinspiron15', Validators.required],
    secondPassword: ['Dellinspiron15', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { }


  /**
   * Create a new user based on the above reactiveForm
   */
  createUser(){
    this.isformSubmitted = true;
    const user = {...this.registerForm.value};
    delete user.secondPassword;
    this.registerService.registerUser(user).subscribe(() => {

      this.router.navigate(['/dashboard']);

    },
    ({graphQLErrors}: {graphQLErrors: GraphQLError[]}) => {

      let errors: string = 'The next errors happened:<br>'

      graphQLErrors.forEach( ({message}, index) => {
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

  invalidInput(inputName: string): boolean{
    if (this.registerForm.get(inputName).invalid && this.isformSubmitted) { return true; }
    return false;
  }

}
