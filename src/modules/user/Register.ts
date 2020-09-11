import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs"
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInputs";
import { isAuth } from "../middleware/isAuth";
import { logger } from "../middleware/logger";
import { sendEmail } from "../../utils/sendEmail";
import { createConfirmationUrl } from "../../utils/createConfirmationUrl";

@Resolver(User)
export class RegisterResolver {

    @UseMiddleware(isAuth, logger)
    @Query(() => String)
    async hello() {
        // fake async in this example
        return "hello world";
    }

    // @FieldResolver()
    // async name(@Root() parent: User) {
    //     return `${parent.firstName} ${parent.lastName}`
    // }


    @Mutation(() => User)
    async register(
        @Arg("data") { email, firstName, lastName, password }: RegisterInput,
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save()
        await sendEmail(email, await createConfirmationUrl(user.id));

        return user;
    }
}

