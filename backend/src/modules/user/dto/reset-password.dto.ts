import { Matches, MinLength } from 'class-validator';

export class ResetPasswordDto{
  
  @MinLength(8, {
    message : "The password must be at least 8 characters long"
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message : 'Make sure your password is secure'
  })
  password : string;

}