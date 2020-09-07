import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GqlAuthGuard extends AuthGuard(['token', 'jwt']){
  
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    
    const currentOperation =  ctx.getInfo().parentType.name;
    const isAccesssTokenAuthGuard = ctx.getContext().req.headers.apitoken ? true : false;

    if(isAccesssTokenAuthGuard && currentOperation !== 'Query'){
      throw new UnauthorizedException('You are not allowed to perform mutations with only API TOKEN');
    }

    return ctx.getContext().req;
  }

  handleRequest(err, user, info, context) {

    if (err || !user ) {
      throw err || new UnauthorizedException("Operation not allowed");
    }

    if(!user.confirmed){
      throw new UnauthorizedException("Please, verify your email");
    }

    return user;    
  }
}

