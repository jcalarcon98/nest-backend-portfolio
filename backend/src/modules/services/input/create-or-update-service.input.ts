import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';


@InputType()
export class CreaterOrUpdateServiceInput{

  @IsNotEmpty({
    message: 'Service title is required'
  })
  @Field({ description: 'Service title' })
  title : string;

  @IsNotEmpty({
    message: 'Service description is required'
  })
  @Field({description : 'Service description'})
  description : string;

}