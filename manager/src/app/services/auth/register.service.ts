import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { tap } from 'rxjs/operators';

const signUp = gql`
  mutation signUp($createUserInput: CreateUserInput!) {
    signUp(createUserInput: $createUserInput) {
      id,
      firstNames,
      lastNames,
      email,
      country,
      city,
      accessToken
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private apollo: Apollo) { }

  registerUser(user){

    return this.apollo.mutate({
      mutation: signUp,
      errorPolicy: 'all',
      variables: {
        createUserInput: user
      }
    }).pipe(
      tap(({errors, data}: {errors: any, data: any}) => {

        if (errors) { return; }

        const { signUp } = data;
        localStorage.setItem('token', signUp.accessToken);
      })
    );
  }
}
