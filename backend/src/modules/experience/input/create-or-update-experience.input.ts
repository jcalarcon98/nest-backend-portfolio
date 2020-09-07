import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateOrUpdateExperienceInput{

  @IsNotEmpty({
    message: 'Institution name is required'
  })
  @Field({
    description:  'Institution name'
  })
  institution : string;

  @IsNotEmpty({
    message: 'The position is required'
  })
  @Field({
    description: 'Position held'
  })
  role : string;
  
  @IsNotEmpty({
    message: `Position's start year is required`
  })
  @Field({
    description: `Position's start year` 
  })
  initYear : number;

  @IsNotEmpty({
    message: `Position's end year is required`
  })
  @Field({
    description: `Position's end year`
  })
  endYear : number;
  
  @Field({
    description: `Optional description of the position you held`,
    nullable: true
  })
  description : string;

}