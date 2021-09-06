import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

const getKey = (_, previousPageData) => {
	if (
		previousPageData &&
		!previousPageData.user.repositories.pageInfo.hasNextPage
	)
		return null;
	return `
	{
		user(login: "samrobbins85") {
		  repositories(first: 100 ${
				previousPageData
					? `after: "${previousPageData.user.repositories.pageInfo.endCursor}"`
					: ""
			}) {
			nodes {
			  name
			}
			pageInfo {
				endCursor
				hasNextPage
			  }
		  }
		}
	  }`;
};

export default function IndexPage({ gqlclient }) {
	const [session] = useSession();
	const [authenticated, setAuthenticated] = useState(false);
	const [store, setStore] = useState(false);

	const { data } = useSWRInfinite(authenticated && !store && getKey, {
		initialSize: 10,
	});

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

	if (data) {
		setStore(data.map((item) => item.user.repositories.nodes).flat());
	}

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
				<ol className="list-decimal">
					{store &&
						store.map((repo) => (
							<li key={repo.name}>{repo.name}</li>
						))}
				</ol>
			</div>
		</>
	);
}
