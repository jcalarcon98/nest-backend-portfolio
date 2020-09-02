import { ObjectType, Field } from "@nestjs/graphql";
import { SkillLevelsEnum } from '../../../common/enums/skill-levels.enum';


@ObjectType('Skill')
export class SkillType{

  @Field({
    description:  'Identificador de la habilidad'
  })
  id:  number;

  @Field({
    description: 'Nombre de la habilidad'
  })
  name : string;

  @Field({
    description: 'Nivel de la habilidad'
  })
  level : SkillLevelsEnum;

  @Field({
    description: 'Descripción de la habilidad'
  })
  description : string;

  @Field({
    description: 'Imagen referencial de la habilidad'
  })
  image : string;
}