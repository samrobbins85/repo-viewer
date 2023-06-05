import "../styles/index.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import SWRProvider from "../providers/auth";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
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
			<SessionProvider session={session}>
				<SWRProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</SWRProvider>
			</SessionProvider>
		</>
	);
}
