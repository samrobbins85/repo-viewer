import "../styles/index.css";
import Head from "next/head";
import { GraphQLClient } from "graphql-request";

function MyApp({ Component, pageProps }) {
	const client = new GraphQLClient("https://api.github.com/graphql");
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
			<Component gqlclient={client} {...pageProps} />
		</>
	);
}

export default MyApp;
