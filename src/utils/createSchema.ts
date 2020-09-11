import { buildSchema } from "type-graphql";
import { MeResolver } from "../modules/user/Me";
import { LoginResolver } from "../modules/user/Login";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { ChangePasswordResolver } from "../modules/user/changePassword/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { RegisterResolver } from "../modules/user/Register";
import { LogoutResolver } from "../modules/user/Logout";

export const createSchema = () => {
    return buildSchema({
        resolvers: [MeResolver, LoginResolver, ForgotPasswordResolver, ChangePasswordResolver, ConfirmUserResolver, RegisterResolver, LogoutResolver],
        authChecker: ({ context: { req } }) => {
            return !!req.session.userId;
        }
    })
}