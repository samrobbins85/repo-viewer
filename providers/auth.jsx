import { SWRConfig } from "swr";
import { useSession } from "next-auth/react";
import { GraphQLClient } from "graphql-request";

export default function SWRProvider({ children }) {
	const { data: session } = useSession();
	const client = new GraphQLClient("https://api.github.com/graphql", {
		headers: { authorization: `Bearer ${session?.accessToken || ""}` },
	});
	const fetcher = (query) => client.request(query);
	return (
		<SWRConfig
			value={{
				fetcher,
			}}
		>
			{children}
		</SWRConfig>
	);
}
