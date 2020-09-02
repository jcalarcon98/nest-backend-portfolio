
import { Social } from '../modules/social/social.entity';
import { CreateOrUpdateSocialInput } from '../modules/social/input/create-or-update-social.input';

export class SocialUtils{


  static getUpdatedSocial(currentSocial : Social, updateSocialInput : CreateOrUpdateSocialInput) : Social{
    
    const { name, url,} = updateSocialInput;
    
    currentSocial.name = name;
    currentSocial.url = url;

    return currentSocial;
  }
  

}   