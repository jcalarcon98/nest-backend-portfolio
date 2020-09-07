import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl, Length } from 'class-validator';

@InputType()
export class CreateOrUpdateSocialInput{
  
  @IsNotEmpty({
    message: "Social network name is required"
  })
  @Length(2, 50, {
    message: "Social network name must be between 2 and 50 characters"
  })
  @Field({description: "Social network"})
  name : string;

  @IsNotEmpty({
    message: "Social network URL is required"
  })
  @IsUrl()
  @Field({description: "Social Network is required"})
  url : string;

}