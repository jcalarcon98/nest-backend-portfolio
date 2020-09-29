import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SIGN_IN } from '../../operations/mutation/auth/login.mutation';
import { User } from '../../models/user.model';
import { LoginForm } from '../../interfaces/login-form.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUser: User;

  constructor(private apollo: Apollo) {}

  login(authCredentialsInput: LoginForm): any{

    return this.apollo.mutate({
      mutation: SIGN_IN,
      variables: {
        authCredentialsInput
      }
    }).pipe(
      tap( ({errors, data }: {errors: any, data: any}) => {

        if (errors) { return; }

        const {
          id,
          firstNames,
          lastNames,
          email,
          country,
          accessToken,
          city,
          description,
          address,
          image
        } = data.signIn;

        this.currentUser = {
          id,
          firstNames,
          lastNames,
          email,
          country,
          accessToken,
          city,
          description,
          address,
          image,
          password: '',
        };

        localStorage.setItem('user', JSON.stringify(this.currentUser));
        localStorage.setItem('token', this.currentUser.accessToken);
      })
    );
  }
}
