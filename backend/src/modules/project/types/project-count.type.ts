
import { ObjectType, Field } from '@nestjs/graphql';
import { Project } from '../project.entity';
import { ProjectType } from './project.type';

/**
 * Contains all the user fields for GraphQL
 * documentation
 */
@ObjectType()
export class ProjectCountType {
  
  @Field(type => [ProjectType])
  list: Project[];

  @Field({ description: 'Project numbers' })
  count: number;

}
