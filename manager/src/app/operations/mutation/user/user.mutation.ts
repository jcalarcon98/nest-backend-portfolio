
import gql from 'graphql-tag';

export const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      firstNames,
      lastNames,
      country,
      city,
      description,
      address,
    }
  }
`;

export const UPDATE_USER_IMAGE = gql`
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
