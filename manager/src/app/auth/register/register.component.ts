import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from '../../services/auth/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.formBuilder.group({
    firstNames: ['Jean Carlos', [Validators.required, Validators.minLength(3)]],
    lastNames: ['Alarcón Ochoa', Validators.required],
    email: ['jeancalarcon98@gmail.com', [Validators.required, Validators.email]],
    country: ['Ecuador', Validators.required],
    city: ['Loja', Validators.required],
    password: ['Dellinspiron15', Validators.required],
    secondPassword: ['caminantes12', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) { }

  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    const user = {...this.registerForm.value};
    delete user.secondPassword;
    console.log(user);
    this.registerService.registerUser(user);
  }

  invalidInput(inputName: string): boolean{
    if (this.registerForm.get(inputName).invalid && this.formSubmitted) { return true; }
    return false;
  }

}
