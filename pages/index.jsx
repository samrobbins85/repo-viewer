import Head from "next/head";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { countBy } from "lodash";
import Link from "next/link";
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
			  repositoryTopics(first: 10) {
				nodes {
				  topic {
					name
				  }
				}
			  }
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
	if (store) {
		console.log(store);
	}

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
		setStore(
			countBy(
				data
					.map((item) => item.user.repositories.nodes)
					.flat()
					.map((item) =>
						item.repositoryTopics.nodes.map(
							(elem) => elem.topic.name
						)
					)
					.flat()
			)
		);
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
				<div className="flex flex-wrap gap-2 px-4 justify-center">
					{store &&
						Object.keys(store).map((topic) => (
							<Link href={`/${topic}`} key={topic}>
								<a className="p-4 border rounded">
									<h2 className="text-lg font-semibold">
										{topic}
									</h2>
									<span>{store[topic]} repository</span>
								</a>
							</Link>
						))}
				</div>
			</div>
		</>
	);
}
