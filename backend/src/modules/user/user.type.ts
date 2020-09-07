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

  @Field({ description: 'Person names' })
  firstNames: string;

  @Field({ description: 'Person lastnames' })
  lastNames: string;

  @Field({ description: 'Person description' })
  description: string;

  @Field({ description: 'Person email' })
  email: string;

  @Field({ description: 'Person country' })
  country: string;

  @Field({ description: 'Person city' })
  city: string;

  @Field({
    description: 'Person address',
    nullable: true,
  })
  address: string;

  @Field({
    description: 'Person image',
    nullable: true,
  })
  image: string;

  @Field({
    description: 'Person email confirmation status'
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
