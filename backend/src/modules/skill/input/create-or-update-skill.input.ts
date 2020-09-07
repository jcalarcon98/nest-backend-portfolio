import { InputType, Field } from '@nestjs/graphql';
import { SkillLevelsEnum } from '../../../common/enums/skill-levels.enum';
import { IsNotEmpty, IsIn } from 'class-validator';

@InputType()
export class CreateOrUpdateSkillInput{

  @IsNotEmpty({
    message: 'Skill name can not be empty'
  })
  @Field({
    description: 'Skill name'
  })
  name : string;

  @IsNotEmpty({
    message: 'Skill level can not be empty'
  })
  @IsIn(
    [SkillLevelsEnum.HIGH, SkillLevelsEnum.LOW, SkillLevelsEnum.MEDIUM],
    { message: 'The type should be: high, medium, low'}
  )
  @Field({
    description: 'SKill level'
  })
  level : SkillLevelsEnum;

  @IsNotEmpty({
    message: 'Skill description can not be empty'
  })
  @Field({
    description: 'Skill description'
  })
  description : string;

}