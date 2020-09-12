import { Apollo } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

const updateUser = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id,
      firstNames,
      lastNames,
      email,
      description,
      country,
      city,
      address,
    }
  }
`;


const updateUserImage = gql`
  mutation updateUserImage(
    $picture: Upload!
    $updateImageInput: UpdateImageInput!
  ){
    updateUserImage(
      picture: $picture,
      updateImageInput: $updateImageInput
    )
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  updateUser(updatedUser): any{

    const token = localStorage.getItem('token');

    return this.apollo.mutate({
      mutation: updateUser,
      errorPolicy: 'all',
      variables: {
        updateUserInput: updatedUser
      },
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer  ${token}`)
      }
    });
  }

  updateUserImage(picture, updateImageInput): any{

    const token = localStorage.getItem('token');

    return this.apollo.mutate({
      mutation: updateUserImage,
      errorPolicy: 'all',
      variables: {
        picture,
        updateImageInput
      },
      context: {
        headers: new HttpHeaders().set('Authorization', `Bearer  ${token}`)
      }
    });
  }


}
