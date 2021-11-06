import Head from "next/head";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { countBy } from "lodash";
import Link from "next/link";
const getKey = (_, previousPageData) => {
	if (
		previousPageData &&
		!previousPageData.viewer.repositories.pageInfo.hasNextPage
	)
		return null;
	return `
	{
		viewer {
		  repositories(first: 100 ${
				previousPageData
					? `after: "${previousPageData.viewer.repositories.pageInfo.endCursor}"`
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

	let store = false;
	if (data) {
		store = Object.fromEntries(
			Object.entries(
				countBy(
					data
						.map((item) => item.viewer.repositories.nodes)
						.flat()
						.map((item) =>
							item.repositoryTopics.nodes.map(
								(elem) => elem.topic.name
							)
						)
						.flat()
				)
			).sort(([, a], [, b]) => b - a)
		);
	}

	return (
		<>
			<Head>
				<title>Repository Viewer</title>
				<meta
					name="Description"
					content="View GitHub repositories grouped by tag"
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
									<span className="text-gray-700">
										{store[topic]}{" "}
										{store[topic] === 1
											? "repository"
											: "repositories"}
									</span>
								</a>
							</Link>
						))}
				</div>
			</div>
		</>
	);
}
