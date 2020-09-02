import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsInt, Min } from 'class-validator';

@InputType()
export class PaginationInput {

    @IsInt({
        message: "Solo se aceptan numeros"
    })
    @Min(0, {
        message: "Solo se aceptan numeros enteros positivos"
    })
    @Field({
        nullable: true
    })
    skip: number = 0;


    @IsPositive({
        message: "Solo se aceptan numeros positivos"
    })
    @IsInt({
        message: "Solo se aceptan numeros"
    })
    @Field({
        nullable: true
    })
    take: number = 0;

}