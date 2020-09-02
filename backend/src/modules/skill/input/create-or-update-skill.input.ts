import { InputType, Field } from '@nestjs/graphql';
import { SkillLevelsEnum } from '../../../common/enums/skill-levels.enum';
import { IsNotEmpty, IsIn } from 'class-validator';

@InputType()
export class CreateOrUpdateSkillInput{

  @IsNotEmpty({
    message: 'El nombre de la habilidad no puede estar vacio'
  })
  @Field({
    description: 'Nombre de la habilidad'
  })
  name : string;

  @IsNotEmpty({
    message: 'El nivel de la habilidad no puede estar vacio'
  })
  @IsIn(
    [SkillLevelsEnum.HIGH, SkillLevelsEnum.LOW, SkillLevelsEnum.MEDIUM],
    { message: 'El tipo debería ser: high, medium, low'}
  )
  @Field({
    description: 'Nivel de la habilidad'
  })
  level : SkillLevelsEnum;

  @IsNotEmpty({
    message: 'La descripción de la habilidad no puede estar vacia'
  })
  @Field({
    description: 'Descripción de la habilidad'
  })
  description : string;

}