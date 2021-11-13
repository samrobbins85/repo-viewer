import Head from "next/head";

import useSWRInfinite from "swr/infinite";
import { countBy } from "lodash";
import Link from "next/link";
import { useSession } from "next-auth/client";

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
			  repositoryTopics(first: 100) {
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

export default function IndexPage() {
	const [session] = useSession();
	const { data } = useSWRInfinite(session.accessToken && getKey, {
		initialSize: 10,
	});
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
