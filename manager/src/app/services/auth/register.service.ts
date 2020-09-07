import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const signUp = gql`
  mutation signUp($createUserInput: CreateUserInput!) {
    signUp(createUserInput: $createUserInput) {
      country
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private apollo: Apollo) { }

  registerUser(user){

    this.apollo.mutate({
      mutation: signUp,
      variables: {
        createUserInput: user
      }
    }).subscribe(({data}) => {
      console.log('Ojito con la Data', data);
    }, (error) => {
      console.log('There is an error', error);
    });
  }
}
