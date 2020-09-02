import { Repository, EntityRepository } from 'typeorm';
import { Phone } from './phone.entity';
import { User } from '../user/user.entity';
import { CreateOrUpdatePhoneInput } from './input/create-or-update-phone.input';
import { NotFoundException } from '@nestjs/common';
import { NOT_FOUND_PHONE } from '../../common/messages/phone.message';
import { PhoneUtils } from '../../utils/phone.utils';

@EntityRepository(Phone)
export class PhoneRepository extends Repository<Phone>{

  async getPhone(id: number, user: User): Promise<Phone> {
    
    const phone = await this.findOne({ id, userId: user.id });

    if (!phone) {
      throw new NotFoundException(NOT_FOUND_PHONE);
    }
    return phone;
  }

  async createPhone(createPhoneInput: CreateOrUpdatePhoneInput, user: User): Promise<Phone> {
    let phone = new Phone();
    
    phone = PhoneUtils.getUpdatedPhone(phone, createPhoneInput);
    
    phone.user = user;

    return await phone.save();
  }

  async updatePhone(id: number, updatePhoneInput: CreateOrUpdatePhoneInput, user: User): Promise<Phone> {
    let currentPhone = await this.getPhone(id, user);
    
    currentPhone = PhoneUtils.getUpdatedPhone(currentPhone, updatePhoneInput);

    return await currentPhone.save();
  }

  async deletePhone(id: number, user: User): Promise<boolean> {
    const deletedPhone = await this.delete({ id, userId: user.id });

    if(deletedPhone.affected === 0){
      throw new NotFoundException(NOT_FOUND_PHONE);
    }
    
    return true;
  }

}