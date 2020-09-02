import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GqlAuthGuard extends AuthGuard(['token', 'jwt']){
  
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    
    const operation =  ctx.getInfo().parentType.name;
    const isAccesssTokenAuthGuard = ctx.getContext().req.headers.apitoken ? true : false;

    if(isAccesssTokenAuthGuard && operation !== 'Query'){
      throw new UnauthorizedException('No tiene permitido realizar mutations con el API TOKEN');
    }

    return ctx.getContext().req;
  }

  //TODO change message
  handleRequest(err, user, info, context) {

    if (err || !user ) {
      throw err || new UnauthorizedException("Operación no permitida - AUTHGUARD");
    }

    if(!user.confirmed){
      throw new UnauthorizedException("Por favor verifique su correo electrónico para realizar peticiones");
    }

    return user;    
  }
}

