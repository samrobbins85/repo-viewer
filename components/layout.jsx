import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
export default function Layout({ children }) {
	const [session, loading] = useSession();
	return (
		<div className="h-screen flex flex-col">
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
			{!session && !loading && (
				<div className="flex justify-center items-center flex-grow">
					<div className="border p-4 flex flex-col justify-center h-52">
						<h1 className="text-center text-2xl font-medium">
							You are logged out
						</h1>
						<button
							className="text-center mt-8 bg-blue-100 rounded hover:bg-blue-300 focus:bg-blue-300"
							onClick={() => signIn("github")}
						>
							Click Here to log in
						</button>
					</div>
				</div>
			)}
			{session && <div className="py-6">{children}</div>}
		</div>
	);
}
