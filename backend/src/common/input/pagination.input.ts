import { InputType, Field } from '@nestjs/graphql';
import { IsPositive, IsInt, Min } from 'class-validator';

@InputType()
export class PaginationInput {

    @IsInt({
        message: "Only numbers are accepted"
    })
    @Min(0, {
        message: "Only positive numbers are accepted"
    })
    @Field({
        nullable: true
    })
    skip: number = 0;


    @IsPositive({
        message: "Only positive numbers are accepted"
    })
    @IsInt({
        message: "Only numbers are accepted"
    })
    @Field({
        nullable: true
    })
    take: number = 0;

}