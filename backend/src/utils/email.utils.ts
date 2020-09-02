import * as nodemailer from 'nodemailer';
export class EmailUtils{
  
  static getTransporter(){

    const emailHost : any = process.env.EMAIL_HOST; 
    const emailPort : any = process.env.EMAIL_PORT; 
    const emailAuthType : any = process.env.AUTH_TYPE;
    const emailAccount : any = process.env.EMAIL_ACCOUNT;
    const emailClientId : any= process.env.EMAIL_CLIENT_ID;
    const emailClientSecret : any = process.env.EMAIL_CLIENT_SECRET;
    const emailRefreshToken : any = process.env.EMAIL_REFRESH_TOKEN;
    const emailAccessToken : any = process.env.EMAIL_ACCESS_TOKEN;

    let transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: true,
      auth: {
        type:  emailAuthType,
        user: emailAccount,
        clientId: emailClientId,
        clientSecret: emailClientSecret,
        refreshToken: emailRefreshToken,
        accessToken: emailAccessToken,
        expires: 1484314697598
      }
    });

    return transporter;
  }
}



