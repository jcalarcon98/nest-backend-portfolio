import gql from 'graphql-tag';

export const CREATE_PROJECT = gql`
  mutation createProject(
    $picture: Upload,
    $createProjectInput:CreateOrUpdateProjectInput!) {
    createProject(picture: $picture, createProjectInput: $createProjectInput){
      title,
      description,
      status,
      image
    }
  }`;
