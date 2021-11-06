import { signIn } from "next-auth/client";
export default function LandingPage() {
	return (
		<div className="py-6 pt-10 px-4">
			<h1 className="text-5xl font-bold text-center pb-4">
				Repository Viewer
			</h1>
			<h2 className="text-center text-lg">
				View your GitHub repositories grouped by tag to make them easier
				to find
			</h2>
			<div className="flex justify-center">
				<button
					className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 mt-6"
					onClick={() => signIn("github")}
				>
					Sign In
				</button>
			</div>
		</div>
	);
}
