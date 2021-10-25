import "../styles/index.css";
import Head from "next/head";
import { GraphQLClient } from "graphql-request";
import { SWRConfig } from "swr";
import { Provider } from "next-auth/client";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
	const client = new GraphQLClient("https://api.github.com/graphql");
	const fetcher = (query) => client.request(query);
	return (
		<>
			<Head>
				<link
					rel="preload"
					href="/fonts/Inter.var.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
			</Head>
			<SWRConfig value={{ fetcher: fetcher }}>
				<Provider session={pageProps.session}>
					<Layout>
						<Component gqlclient={client} {...pageProps} />
					</Layout>
				</Provider>
			</SWRConfig>
		</>
	);
}

export default MyApp;
