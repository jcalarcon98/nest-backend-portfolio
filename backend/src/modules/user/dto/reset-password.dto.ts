import { Matches, MinLength } from 'class-validator';

export class ResetPasswordDto{
  
  @MinLength(8, {
    message : "La contraseña debe tener al menos 8 caracteres"
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message : 'Asegurese que su contraseña sea segura'
  })
  password : string;

}