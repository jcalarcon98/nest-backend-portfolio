import gql from 'graphql-tag';

export const SIGN_UP = gql`
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
