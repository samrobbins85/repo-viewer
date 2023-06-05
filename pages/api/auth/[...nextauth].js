import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			authorization: {
				params: {
					scope: "repo, user",
				},
			},
			profile(profile) {
				return {
					id: profile.id,
					name: profile.login,
					email: profile.email,
					image: profile.avatar_url,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account?.access_token) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken;
			return session;
		},
	},
});
