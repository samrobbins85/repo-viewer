import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
export default function Layout({ children }) {
	const [session] = useSession();
	return (
		<>
			<nav className="bg-gray-100 py-2 flex px-4 justify-between">
				<Link href="/">
					<a className="font-bold">Repo Viewer</a>
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
			<div className="py-6">{children}</div>
		</>
	);
}
