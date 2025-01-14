import {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
} from "@/store/environmentVariables";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GitHubProvider({
            clientId: String(GITHUB_CLIENT_ID),
            clientSecret: String(GITHUB_CLIENT_SECRET),
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
