import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import useSWR from "swr";
export default function IndexPage({ gqlclient }) {
	const [session] = useSession();
	const [authenticated, setAuthenticated] = useState(false);

	const { data } = useSWR(
		authenticated
			? `
			{
				user(login: "samrobbins85") {
				  repositories(first: 100) {
					nodes {
					  name
					}
				  }
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
				<h1 className="text-center">
					Hello, World - {authenticated.toString()}{" "}
				</h1>
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
				<ul>
					{data &&
						data.user.repositories.nodes.map((repo) => (
							<li key={repo.name}>{repo.name}</li>
						))}
				</ul>
				{/* {data && <p>Your username is {data.viewer.login}</p>} */}
			</div>
		</>
	);
}
