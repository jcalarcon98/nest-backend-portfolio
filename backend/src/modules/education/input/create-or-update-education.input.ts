import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrUpdateEducationInput{

  @IsNotEmpty({
    message: 'Institution name is required'
  })
  @Field({
    description:  'Institution Name'
  })
  institution : string;

  @IsNotEmpty({
    message: 'Degree obtained is required'
  })
  @Field({
    description: 'Degree obtained'
  })
  title : string;
  
  @IsNotEmpty({
    message: 'Start year of the study is mandatory'
  })
  @Field({
    description: 'Year Study Started'
  })
  initYear : number;

  @IsNotEmpty({
    message: 'End year of the study is required'
  })
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