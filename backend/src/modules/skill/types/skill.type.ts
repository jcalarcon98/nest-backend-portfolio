import { ObjectType, Field } from "@nestjs/graphql";
import { SkillLevelsEnum } from '../../../common/enums/skill-levels.enum';

@ObjectType('Skill')
export class SkillType{

  @Field({
    description:  'Skill identifier'
  })
  id:  number;

  @Field({
    description: 'Skill name'
  })
  name : string;

  @Field({
    description: 'SKill level'
  })
  level : SkillLevelsEnum;

  @Field({
    description: 'Skill description'
  })
  description : string;

  @Field({
    description: 'Skill reference image'
  })
  image : string;
}