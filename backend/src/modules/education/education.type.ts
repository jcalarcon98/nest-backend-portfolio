
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Education')
export class EducationType{

  @Field({
    description:  'Institution Name'
  })
  institution : string;

  @Field({
    description: 'Degree obtained'
  })
  title : string;
  
  @Field({
    description: 'Year Study Started'
  })
  initYear : number;

  @Field({
    description: 'End study year'
  })
  endYear : number;

  @Field({
    description: 'Optional description about study period',
    nullable: true
  })
  description : string;

}