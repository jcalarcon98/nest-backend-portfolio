import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { tap } from 'rxjs/operators';
import { SIGN_UP } from '../../operations/mutation/auth/register.mutation';
import { RegisterForm } from '../../interfaces/register-form.interface';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private currentUser: User;

  constructor(private apollo: Apollo) { }

  registerUser(createUserInput: RegisterForm){

    return this.apollo.mutate({
      mutation: SIGN_UP,
      variables: {
        createUserInput
      }
    }).pipe(
      tap(({errors, data}: {errors: any, data: any}) => {

        if (errors) { return; }

        const {
          id,
          firstNames,
          lastNames,
          email,
          country,
          city,
          accessToken,
        } = data.signUp;

        this.currentUser = {
          id,
          firstNames,
          lastNames,
          email,
          country,
          accessToken,
          city,
          password: '',
        };

        localStorage.setItem('user', JSON.stringify(this.currentUser));
        localStorage.setItem('token', this.currentUser.accessToken);
      })
    );
  }
}
