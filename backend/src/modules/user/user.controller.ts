import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('user')
export class UserController {

  constructor(private userService: UserService){}

  @Get('/confirm/:id')
  confirmEmail(
    @Param('id') id : string
  ): Promise<boolean>{
    return this.userService.confirmEmail(id);
  }


  @Post('/reset/:id')
  resetPassword(
    @Param('id') id : string,
    @Body() resetPasswordDto : ResetPasswordDto 
  ): Promise<boolean>{
    return this.userService.resetPassword(id, resetPasswordDto);
  }
}
