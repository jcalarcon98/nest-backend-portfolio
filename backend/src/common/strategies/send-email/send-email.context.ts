
import { ISendEmailStrategy } from './send-email.strategy';
import { EmailUtils } from '../../../utils/email.utils';

export class SendEmailContext{

  private sendEmailClass : ISendEmailStrategy;

  constructor(sendEmailClass : ISendEmailStrategy){
    this.sendEmailClass = sendEmailClass;
  }

  async sendEmail(
    receiverEmail : string,
    hasData : boolean
  ){  

    const data = hasData ? await this.sendEmailClass.getData() : {};
    const template = this.sendEmailClass.getTemplate(data);
    const subject = this.sendEmailClass.getSubject();

    const transporter = EmailUtils.getTransporter();
  
    await transporter.sendMail({
        from: process.env.EMAIL_ACCOUNT,
        to: receiverEmail, 
        subject: subject,
        html: template
    })
    transporter.close();
  }
}