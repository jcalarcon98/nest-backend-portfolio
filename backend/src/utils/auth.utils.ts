import { JwtPayload } from '../modules/auth/jwt-payload.interface';
import { NewUserType } from '../modules/auth/types/new-user.type';


export class AuthUtils{  
    static getPayload(email : string) : JwtPayload{
        const payload : JwtPayload = { email };
        return payload;
    }    

    static getUserWithAccessToken(accessToken: string, user : any) : NewUserType{
        user.accessToken = accessToken;
        let userWithAccessToken : NewUserType = {...user};    
        return userWithAccessToken;
    }
    
}   