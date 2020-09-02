import { Phone } from '../modules/phone/phone.entity';
import { CreateOrUpdatePhoneInput } from '../modules/phone/input/create-or-update-phone.input';

export class PhoneUtils{


  static getUpdatedPhone(currentPhone : Phone, updatePhoneInput : CreateOrUpdatePhoneInput){
    
    const {number} = updatePhoneInput;

    currentPhone.number = number;

    return currentPhone;
  }
}   