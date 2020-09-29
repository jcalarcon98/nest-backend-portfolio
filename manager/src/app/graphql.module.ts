import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from 'apollo-angular/http';

const uri = 'http://localhost:4000/api/graphql'; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const errorLink = onError(({operation, response, graphQLErrors, networkError}) => {

    console.log('Operation', operation);

    console.log('Response', response);

    if (graphQLErrors){
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(`[GraphQL error]: ${message}, Location: ${locations}, Path: ${path}`);
      },
    );
    }

    if (networkError){
      console.log(`Network Error ${networkError}`);
    }
  });

  const httpLinkWithErrorHandling = ApolloLink.from([errorLink, httpLink.create({uri})]);

  return {
    link: httpLinkWithErrorHandling,
    cache: new InMemoryCache(),
  };
}
@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
