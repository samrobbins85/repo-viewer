import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect } from "react";
import useSWR from "swr";
export default function IndexPage({
	gqlclient,
	authenticated,
	setAuthenticated,
}) {
	const [session] = useSession();

	const { data } = useSWR(
		authenticated
			? `query { 
		viewer { 
		  login
		}
	  }`
			: null
	);

	useEffect(() => {
		if (session?.accessToken) {
			gqlclient.setHeader(
				"authorization",
				`Bearer ${session.accessToken}`
			);
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
		}
	}, [session, gqlclient, setAuthenticated]);

	return (
		<>
			<Head>
				<title>Next.js Template</title>
				<meta
					name="Description"
					content="My template Next.js application"
				/>
			</Head>
			<div>
				<h1 className="text-center">Hello, World </h1>
				{!session && (
					<>
						Not signed in <br />
						<button onClick={() => signIn("github")}>
							Sign in
						</button>
					</>
				)}
				{session && (
					<>
						Signed in as {session.user.email} <br />
						<p>Token -{session.accessToken}</p>
						<button onClick={() => signOut()}>Sign out</button>
					</>
				)}
				{data && <p>Your username is {data.viewer.login}</p>}
			</div>
		</>
	);
}
