import getMediumRSSFeedDataFor from "@/lib/utils";
import mediumCard from "@/lib/mediumCard";
import axios from "axios";
import moment from "moment";
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
			var result = dataWithValidImageURLs[parseInt(index as string)];
			const thumbnailURL = result.thumbnail;
			let imageType = thumbnailURL.split(".").slice(-1)[0];

			const { data: thumbnailBuf } = await axios.get(thumbnailURL, {
				responseType: "arraybuffer",
			});
			``;
			const thumbnailBufURL = `data:image/${imageType};base64,${Buffer.from(
				thumbnailBuf
			).toString("base64")}`;
			result.thumbnail = thumbnailBufURL;
			result.pubDate = moment(result.pubDate).format("MMM D, YYYY");

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
