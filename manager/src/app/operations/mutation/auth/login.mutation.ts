import gql from 'graphql-tag';

export const SIGN_IN = gql`
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
}`;


