import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";
import { PasswordInput } from "../../../modules/shared/PasswordInput";

@InputType()
export class RegisterInput extends PasswordInput {
    @Field()
    @Length(1, 255)
    firstName: string

    @Field()
    @Length(1, 255)
    lastName: string

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: "email is already in use" })
    email: string

}