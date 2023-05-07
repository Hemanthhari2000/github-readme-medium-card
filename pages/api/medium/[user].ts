import getMediumRSSFeedDataFor from "@/lib/getMediumRSSFeed";
import mediumCard from "@/lib/mediumCard";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		query: { user, index, mode },
	} = req;
	let dataWithValidImageURLs: FeedResponseDataItemsType[] = [];
	let data = {} as FeedResponseType;

	try {
		data = await getMediumRSSFeedDataFor(user as string);
		if (data) {
			let list = data.data;
			list.forEach((element: FeedResponseDataItemsType) => {
				if (element.thumbnail.includes("cdn")) {
					dataWithValidImageURLs.push(element);
				}
			});
			const result = dataWithValidImageURLs[parseInt(index as string)];

			res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
			res.setHeader("Content-Type", "image/svg+xml");

			res.send(
				mediumCard({
					mode: mode as string,
					result: result,
				})
			);
		}
	} catch (error) {
		res.status(400).json(error);
	}
}
