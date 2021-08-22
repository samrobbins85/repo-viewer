import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		async jwt(token, account) {
			// Add access_token to the token right after signin
			if (account?.accessToken) {
				token.accessToken = account.accessToken;
			}
			return token;
		},
		async session(session, token) {
			session.accessToken = token.accessToken;
			return session;
		},
	},
});
