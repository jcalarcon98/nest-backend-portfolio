import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PhoneService } from './phone.service';
import { PhoneType } from './phone.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { CreateOrUpdatePhoneInput } from './input/create-or-update-phone.input';
import { User } from '../user/user.entity';
import { Phone } from './phone.entity';

@Resolver('Phone')
export class PhoneResolver {

  constructor(private phoneService : PhoneService){}

  @Query(returns => PhoneType)
  @UseGuards(GqlAuthGuard)
  phone(
    @Args('id') id: number, 
    @GetUser() user: User
  ): Promise<Phone>{
    return this.phoneService.getPhone(id, user);
  }

  @Mutation(returns => PhoneType)
  @UseGuards(GqlAuthGuard)
  createPhone(
    @Args('createPhoneInput') createPhoneInput: CreateOrUpdatePhoneInput,
    @GetUser() user: User,
  ): Promise<Phone> {
    return this.phoneService.createPhone(createPhoneInput, user);
  }


  @Mutation(returns => PhoneType)
  @UseGuards(GqlAuthGuard)
  updatePhone(
    @Args('id') id: number,
    @Args('updatePhoneInput') updatePhoneInput: CreateOrUpdatePhoneInput,
    @GetUser() user: User,
  ): Promise<Phone> {
    return this.phoneService.updatePhone(id, updatePhoneInput, user);
  }

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  deletePhone(
    @Args('id') id: number,
    @GetUser() user : User
  ) : Promise<boolean>{
    return this.phoneService.deletePhone(id, user);    
  }
}
