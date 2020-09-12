import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Usuario } from '../../models/usuario.model';

const signIn = gql`
  mutation signIn($authCredentialsInput: AuthCredentialsInput!) {
    signIn(authCredentialsInput: $authCredentialsInput) {
      id,
      firstNames,
      lastNames,
      email,
      description,
      country,
      city,
      address,
      image,
      accessToken
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUser = Usuario;

  constructor(
    private apollo: Apollo
  ) {}

  login( credetialsInput ): any{

    return this.apollo.mutate({
      mutation: signIn,
      errorPolicy: 'all',
      variables: {
        authCredentialsInput: credetialsInput
      }
    }).pipe(
      tap( ({errors, data }: {errors: any, data: any}) => {

        if (errors) { return; }

        const { accessToken, address, city, country, description, email, firstNames, id, image, lastNames } = data.signIn;

        this.currentUser = data.signIn;

        localStorage.setItem('token', accessToken);

      })
    );
  }
}
