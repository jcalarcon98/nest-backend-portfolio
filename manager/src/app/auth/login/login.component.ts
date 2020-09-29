import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GraphQLError } from 'graphql';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent{

  // TODO check if this variables helps something
  isFormSubmitted = false;

  loginForm = this.formBuilder.group({
    email: ['jeancalarcon98@gmail.com', [Validators.required, Validators.email]],
    password: ['Dellinspiron15', Validators.required],
  });

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  login(){

    if (!this.loginForm.valid) {
      return;
    }

    this.isFormSubmitted = true;

    this.loginService.login(this.loginForm.value).subscribe(() => {

      this.router.navigate(['dashboard']);

    },
    ({graphQLErrors}: {graphQLErrors: GraphQLError[]}) => {

      const  [{message}] = graphQLErrors;

      Swal.fire({
        title: 'Error!',
        html: message,
        icon: 'error',
        confirmButtonText: 'Retry'
      });

    });
  }
}
