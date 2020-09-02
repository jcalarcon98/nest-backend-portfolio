import { ObjectType, Field } from '@nestjs/graphql';
import { Project } from 'src/modules/project/project.entity';
import { type } from 'os';
import { ServiceType } from '../services/types/service.type';
import { Service } from '../services/service.entity';

import { Skill } from '../skill/skill.entity';
import { EducationType } from '../education/education.type';
import { Education } from '../education/education.entity';
import { Experience } from '../experience/experience.entity';
import { ExperienceType } from '../experience/experience.type';
import { ProjectCountType } from '../project/types/project-count.type';
import { SkillCountType } from '../skill/types/skill-count.type';
import { ServiceCountType } from '../services/types/service-count.type';

/**
 * Contains all the user fields for GraphQL
 * documentation
 */
@ObjectType('User')
export class UserType {
  @Field()
  id: number;

  @Field({ description: 'Nombres completos de la Persona' })
  firstNames: string;

  @Field({ description: 'Apellidos completos de la Persona' })
  lastNames: string;

  @Field({ description: 'Descripción acerca de la Persona' })
  description: string;

  @Field({ description: 'Email de acceso de la Persona' })
  email: string;

  @Field({ description: 'País de Residencia de la Persona' })
  country: string;

  @Field({ description: 'Ciudad de Residencia de la Persona' })
  city: string;

  @Field({
    description: 'Dirección de la Persona',
    nullable: true,
  })
  address: string;

  @Field({
    description: 'Imagen de Perfil de la Persona',
    nullable: true,
  })
  image: string;

  @Field({
    description: 'Estado de confirmación del correo electrónico del usuario'
  })
  confirmed: string;

  @Field(type => ProjectCountType)
  projects: ProjectCountType;

  @Field(type => ServiceCountType)
  services: ServiceCountType;

  @Field(type => SkillCountType)
  skills: SkillCountType;

  @Field(type => [EducationType])
  educations: Education[];

  @Field(type => [ExperienceType])
  experiences: Experience[];
  
}
