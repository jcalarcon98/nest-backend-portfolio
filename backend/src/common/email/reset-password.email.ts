import { ISendEmailStrategy } from "../strategies/send-email/send-email.strategy";
import { redis } from './../../config/redis.config';
import { RESET_PASSWORD_SUBJECT, RESET_PASSWORD, RESET_PASSWORD_BUTTON } from '../messages/email.message';
import { TemplateUtils } from '../../utils/template.utils';
import { User } from '../../modules/user/user.entity';
import { v4 } from 'uuid';
import * as config from 'config';

const hostConfig = process.env.JENIKA_HOST || config.get('host').name;

export class ResetPasswordEmail implements ISendEmailStrategy{

  name : string;
  id : number;

  constructor(user : User){
    this.name = user.firstNames,
    this.id = user.id;
  }
  
  async getData() {

    const url = await this.resetPasswordLink();

    const data = {
      name : this.name,
      body_message : RESET_PASSWORD,
      btn_message : RESET_PASSWORD_BUTTON,
      url
    }

    return data;
  }

  //TODO Agregar un nuevo template para resetear contraseña.
  getTemplate(data: any) {
    return TemplateUtils.getTemplate('templates/email.html', data);
  }

  
  getSubject(): string {
    return RESET_PASSWORD_SUBJECT;
  } 

  private async resetPasswordLink() {
    
    const id = v4();  
    
    
    /* Expira código en una hora */
    await redis.set(id, this.id, "ex", 60*60);

    return `${hostConfig}/api/user/reset/${id}`
  } 

}