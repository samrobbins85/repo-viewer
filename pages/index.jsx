import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";

export default function IndexPage() {
	const [session, loading] = useSession();
	console.log(session);
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
				<h1 className="text-center">Hello, World </h1>
				{!session && (
					<>
						Not signed in <br />
						<button onClick={() => signIn()}>Sign in</button>
					</>
				)}
				{session && (
					<>
						Signed in as {session.user.email} <br />
						<p>Token -{session.accessToken}</p>
						<button onClick={() => signOut()}>Sign out</button>
					</>
				)}
			</div>
		</>
	);
}
