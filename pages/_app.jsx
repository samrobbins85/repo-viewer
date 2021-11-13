import "../styles/index.css";
import Head from "next/head";
import { Provider } from "next-auth/client";
import Layout from "../components/layout";
import SWRProvider from "../providers/auth";

function MyApp({ Component, pageProps }) {
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
			<Provider session={pageProps.session}>
				<SWRProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</SWRProvider>
			</Provider>
		</>
	);
}

export default MyApp;
