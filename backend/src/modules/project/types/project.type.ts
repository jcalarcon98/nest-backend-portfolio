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
    description: 'Url del Repositorio o referencia del Proyecto',
    nullable: true,
  })
  urlProject: string;

  @Field({
    description: 'Imagen referente al Proyecto',
    nullable: true,
  })
  image: string;

  @Field({
    description: 'Estado Actual del proyecto'
  })
  status : ProjectStatusEnum
}
