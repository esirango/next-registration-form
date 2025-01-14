import {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
} from "@/store/environmentVariables";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: "Ov23liu1lOhOOOlD4exH",
            clientSecret: "6ec9dc2a5a7e8fb6d997a6ec84137efa51e0a54b",
        }),
    ],
    callbacks: {
        async session({ session, token, user }: any) {
            session.user.id = token.sub;
            console.log(session);
            return session;
        },
    },
});
