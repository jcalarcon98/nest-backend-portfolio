import { ProjectStatusEnum } from './../../../common/enums/project-status.enum';
import { ObjectType, Field } from '@nestjs/graphql';
/**
 * Contains all the user fields for GraphQL
 * documentation
 */
@ObjectType('Project')
export class ProjectType {
  
  @Field()
  id: number;

  @Field({ description: 'Título del Proyecto' })
  title: string;

  @Field({ description: 'Descripción acerca del Proyecto' })
  description: string;

  @Field({
    description: 'Project demo',
    nullable: true,
  })
  urlDemo: string;

  @Field({
    description: 'Project Repository source code',
    nullable: true
  })
  urlRepository: string;

  @Field({
    description: 'Project reference image',
    nullable: true,
  })
  image: string;

  @Field({
    description: 'Current project status'
  })
  status : ProjectStatusEnum
}
