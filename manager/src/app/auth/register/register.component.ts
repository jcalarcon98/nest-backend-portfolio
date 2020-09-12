import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/auth/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

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

  createUser(){
    this.isformSubmitted = true;
    const user = {...this.registerForm.value};
    delete user.secondPassword;
    this.registerService.registerUser(user).subscribe(({errors, data}) => {

      if (errors){
        Swal.fire({
          title: 'Error!',
          text: errors[0].message,
          icon: 'error',
          confirmButtonText: 'Retry'
        });

        return;
      }

      this.router.navigate(['/dashboard']);

    });
  }

  invalidInput(inputName: string): boolean{
    if (this.registerForm.get(inputName).invalid && this.isformSubmitted) { return true; }
    return false;
  }

}
