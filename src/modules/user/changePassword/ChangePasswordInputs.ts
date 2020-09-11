
import { InputType, Field } from "type-graphql";
import { PasswordInput } from "../../../modules/shared/PasswordInput";


@InputType()
export class ChangePasswordInputs extends PasswordInput {
    @Field()
    token: string
}