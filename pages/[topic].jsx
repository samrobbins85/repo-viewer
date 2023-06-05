import { useRouter } from "next/router";
import Head from "next/head";
import useSWRInfinite from "swr/infinite";
import { useSession } from "next-auth/react";
import Error from "next/error";

export default function Topic() {
	const router = useRouter();
	const { data: session } = useSession();

	const { topic } = router.query;
	const getKey = (previousPageData, topic) => {
		if (previousPageData && !previousPageData.search.pageInfo.hasNextPage)
			return null;
		return `
		{
			search(query: "user:${
				session.user.name
			} topic:${topic}", type: REPOSITORY, first: 100 ${
			previousPageData
				? `after: "${previousPageData.search.pageInfo.endCursor}"`
				: ""
		}) {
			  nodes {
				... on Repository {
				  id
				  name
				  url
				  repositoryTopics(first: 100) {
					nodes {
					  topic {
						name
					  }
					}
				  }
				}
			  }
			  pageInfo {
				hasNextPage
				endCursor
			  }
			}
		  }`;
	};
	const { data, error } = useSWRInfinite(
		session.accessToken &&
			((_, previousPageData) => getKey(previousPageData, topic)),
		{ initialSize: 10 }
	);
	if (data && data.map((item) => item.search.nodes).flat().length === 0) {
		return <Error statusCode={404} />;
	}
	if (error) {
		return <Error />;
	}
	return (
		<>
			<Head>
				<title>{topic}</title>
			</Head>
			<div className="py-4">
				<h1 className="text-2xl font-semibold text-center">{topic}</h1>
				<div className="flex flex-wrap gap-2 px-4 justify-center pt-6">
					{data &&
						data.length &&
						data
							.map((item) => item.search.nodes)
							.flat()
							.map((repo) => (
								<a
									className="p-4 border rounded"
									href={repo.url}
									key={repo.id}
								>
									<h2 className="text-lg font-semibold">
										{repo.name}
									</h2>
								</a>
							))}
				</div>
			</div>
		</>
	);
}
