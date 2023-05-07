import Head from "next/head";
import { Inter } from "next/font/google";
import mediumCard from "@/lib/mediumCard";
import Image from "next/image";
import styles from "@/styles/Construction.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Github Readme Medium Card</title>
				<meta
					name="description"
					content="Generate github readme medium card."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.wrapper}>
				<div className={styles.under_construction}>
					<h1 className={inter.className}>Under Construction</h1>
					<Image
						src={
							"https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Factory%20Worker%20Light%20Skin%20Tone.png"
						}
						alt={"Factory Worker Light Skin Tone"}
						width="100"
						height="100"
					/>
				</div>
			</div>
			<main hidden>
				<h1 className={inter.className}>Github Readme Medium Card</h1>
				<div
					className="card-wrapper"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<div className="card-div" style={{ textAlign: "center" }}>
						<h3>light</h3>
						<div
							className="card1"
							dangerouslySetInnerHTML={{
								__html: mediumCard({
									mode: "dark",
									result: {
										title: "Title Example",
										pubDate: "2023-04-16",
										link: "",
										guid: "",
										author: "hemanth",
										thumbnail:
											"https://cdn-images-1.medium.com/v2/resize:fit:1024/0*jG2SkfAMeWpqyaR4",
										description:
											"Lorem ipsum dolor sit amet consectetur adipisicing elit. A quaerat commodi, culpa minus ab accusantium eos quae totam vitae suscipit molestiae cumque architecto recusandae blanditiis nisi sequi provident voluptate eius!",
										content: "",
										categories: [],
										enclosure: {},
									},
								}),
							}}
						></div>
					</div>
				</div>
			</main>
		</>
	);
}
