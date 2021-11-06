import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
	providers: [
		Providers.GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			scope: "repo, user",
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
		async signIn({ user, account, profile, email, credentials }) {
			console.log({ user, account, profile, credentials, email });
		},
		async jwt(token, user, account) {
			console.log(user);
			console.log(account);
			console.log(token);
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
