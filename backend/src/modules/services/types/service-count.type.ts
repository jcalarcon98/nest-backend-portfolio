import { ObjectType, Field } from '@nestjs/graphql';
import { ServiceType } from './service.type';
import { Service } from '../service.entity';


@ObjectType()
export class ServiceCountType {
  
  @Field(type => [ServiceType])
  list: Service[];

  @Field({ description: 'Numero de servicios' })
  count: number;

}
