import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import LandingPage from "./landingpage";
export default function Layout({ children }) {
	const [session, loading] = useSession();
	return (
		<div className="h-screen flex flex-col">
			<nav className="bg-gray-100 py-2 flex px-4 justify-between">
				<Link href="/">
					<a className="font-bold">Repository Viewer</a>
				</Link>
				{!session && (
					<>
						<button onClick={() => signIn("github")}>
							Sign in
						</button>
					</>
				)}
				{session && (
					<>
						<button onClick={() => signOut()}>Sign out</button>
					</>
				)}
			</nav>
			{!session && !loading && <LandingPage />}
			{session && <div className="py-6">{children}</div>}
		</div>
	);
}
