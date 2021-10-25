import { signIn, signOut, useSession } from "next-auth/client";

export default function Layout({ children }) {
	const [session] = useSession();
	return (
		<>
			<nav className="bg-gray-100 py-2 flex px-4 justify-between">
				<span className="font-bold">Repo Viewer</span>
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
