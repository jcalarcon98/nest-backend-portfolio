import { CONFIRMATION_EMAIL_SUBJECT } from './../messages/email.message';
import { CONFIRMATION_EMAIL_BUTTON, CONFIRMATION_EMAIL } from '../messages/email.message';
import { ISendEmailStrategy } from '../strategies/send-email/send-email.strategy';
import { redis } from './../../config/redis.config';
import { TemplateUtils } from '../../utils/template.utils';
import { User } from '../../modules/user/user.entity';
import { v4 } from 'uuid';
import * as config from 'config';

const host = process.env.HOST || config.get('host').name;
const prefix = process.env.REDIRECT_PREFIX || ''
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

    const completeHost = prefix !== '' ? `${host}/${prefix}` : host;

    return `${completeHost}/user/confirm/${id}`
  } 
}