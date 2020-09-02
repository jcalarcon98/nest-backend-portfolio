import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Phone } from './phone.entity';
import { CreateOrUpdatePhoneInput } from './input/create-or-update-phone.input';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneRepository } from './phone.repository';

@Injectable()
export class PhoneService {

  constructor(
    @InjectRepository(PhoneRepository)
    private phoneRepository : PhoneRepository
  ){}


  getPhone(id: number, user: User): Promise<Phone> {
    return this.phoneRepository.getPhone(id, user);
  }

  createPhone(createPhoneInput: CreateOrUpdatePhoneInput, user: User): Promise<Phone> {
    return this.phoneRepository.createPhone(createPhoneInput, user);
  }

  updatePhone(id: number, updatePhoneInput: CreateOrUpdatePhoneInput, user: User): Promise<Phone> {
    return this.phoneRepository.updatePhone(id, updatePhoneInput, user);
  }

  deletePhone(id: number, user: User): Promise<boolean> {
    return this.phoneRepository.deletePhone(id, user);
  }
  
}
