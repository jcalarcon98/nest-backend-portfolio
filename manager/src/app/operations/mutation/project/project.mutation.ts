import gql from 'graphql-tag';

export const CREATE_PROJECT = gql`
  mutation createProject($createProjectInput:CreateOrUpdateProjectInput!) {
    createProject(createProjectInput: $createProjectInput){
      title,
      description,
      status
    }
  }`;
