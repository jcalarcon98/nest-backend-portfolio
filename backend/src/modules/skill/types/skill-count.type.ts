
import { ObjectType, Field } from '@nestjs/graphql';
import { Skill } from '../skill.entity';
import { SkillType } from './skill.type';



@ObjectType()
export class SkillCountType {
  
  @Field(type => [SkillType])
  list: Skill[];

  @Field({ description: 'Numero de Habilidades'})
  count: number;

}