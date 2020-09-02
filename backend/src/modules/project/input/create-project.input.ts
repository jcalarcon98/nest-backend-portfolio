import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUrl, IsIn} from 'class-validator';
import { ProjectStatusEnum } from '../../../common/enums/project-status.enum';


/**
 * Allows you to define the fields
 * that should go when creating a new user.
 */
@InputType()
export class CreateOrUpdateProjectInput{

    @IsNotEmpty({
      message: "El título del proyecto no puede estar vacio"
    })
    @Field()
    title: string

    @IsNotEmpty({
      message : "La descripción no puede estar vacia"
    })
    @Field()
    description : string;

    @IsUrl({}, {
      message: 'Verifica que la URL se valida'
    })
    @Field({
      nullable: true
    })
    url : string;

    @IsNotEmpty({
      message:  "El estado del proyecto es requerido"
    })
    @IsIn([ProjectStatusEnum.FINISHED, ProjectStatusEnum.IN_PROGRESS], {
      message: "El estado del proyecto es incorrecto"
    })
    @Field()
    status : ProjectStatusEnum
}