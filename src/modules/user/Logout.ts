import { Resolver, Mutation, Ctx } from "type-graphql";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class LogoutResolver {
    @Mutation(() => Boolean)
    async logout(
        @Ctx() { req, res }: MyContext): Promise<Boolean> {
        return new Promise(
            (resolve, rej) => req.session!.destroy((err) => {
                if (err) {
                    return rej(false)
                }
                res.clearCookie("qid")
                return resolve(true)
            }
            )
        )
    }
}