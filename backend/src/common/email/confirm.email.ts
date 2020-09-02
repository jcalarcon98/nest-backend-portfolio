import { redis } from './../../config/redis.config';
import { CONFIRMATION_EMAIL_SUBJECT } from './../messages/email.message';
import { TemplateUtils } from '../../utils/template.utils';
import { v4 } from 'uuid';
import * as config from 'config';
import { User } from '../../modules/user/user.entity';
import { CONFIRMATION_EMAIL_BUTTON, CONFIRMATION_EMAIL } from '../messages/email.message';
import { ISendEmailStrategy } from '../strategies/send-email/send-email.strategy';
const hostConfig = process.env.JENIKA_HOST || config.get('host').name;

export class ConfirmEmail implements ISendEmailStrategy{
  
  name : string;
  id : number;

  constructor(user: User){
    this.name = user.firstNames;
    this.id = user.id;
  }
  
  getTemplate(data: any) {
    return TemplateUtils.getTemplate('templates/email.html', data);
  }

  getSubject(): string {
    return CONFIRMATION_EMAIL_SUBJECT;
  }

  async getData(){   
    
    const url = await this.confirmEmailLink();

    const data = {
      name : this.name,
      body_message : CONFIRMATION_EMAIL,
      btn_message : CONFIRMATION_EMAIL_BUTTON,
      url
    }

    return data;
  }

  private async confirmEmailLink() {
    
    const id = v4();  
    
    await redis.set(id, this.id, "ex", 60*60*15);

    return `${hostConfig}/api/user/confirm/${id}`
  } 
}