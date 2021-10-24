import { useRouter } from "next/router";
import Head from "next/head";
export default function Topic() {
	const router = useRouter();
	const { topic } = router.query;
	return (
		<>
			<Head>
				<title>{topic}</title>
			</Head>
			<div className="py-4">
				<h1 className="text-2xl font-semibold text-center">{topic}</h1>
			</div>
		</>
	);
}
