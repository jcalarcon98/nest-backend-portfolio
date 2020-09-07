import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Experience')
export class ExperienceType{

  @Field({
    description:  'Institution Name'
  })
  institution : string;

  @Field({
    description: 'Position held'
  })
  role : string;
  
  @Field({
    description: `Position's start year`
  })
  initYear : number;

  @Field({
    description:  `Position's end year`
  })
  endYear : number;

  @Field({
    description: 'Optional description of the position you held',
    nullable: true
  })
  description : string;

}