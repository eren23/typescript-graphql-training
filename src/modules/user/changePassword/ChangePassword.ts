import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../../../entity/User";
import bcrypt from "bcryptjs"
import { redis } from "../../../redis";
import { forgotPasswordPrefix } from "../../constants/redisPrefixes";
import { ChangePasswordInputs } from "./ChangePasswordInputs";
import { MyContext } from "../../../types/MyContext";



@Resolver(User)
export class ChangePasswordResolver {

    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data") { token, password }: ChangePasswordInputs,
        @Ctx() { req }: MyContext
    ): Promise<User | null> {
        const userId = await redis.get(forgotPasswordPrefix + token)
        if (!userId) {
            return null;
        }
        const user = await User.findOne(userId)
        if (!user) {
            return null
        }

        await redis.del(forgotPasswordPrefix + token)
        user.password = await bcrypt.hash(password, 12);
        await user.save();
        req.session!.userId = user.id;
        return user;
    }
}

