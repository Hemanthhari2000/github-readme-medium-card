import { extractFirstImageUrl, getMediumRSSFeedDataFor } from "@/lib/utils";
import mediumCard from "@/lib/mediumCard";
import axios from "axios";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let { user, index, mode }: Partial<MediumAPIQueryParams> = req.query;
    if (index === undefined) {
      index = 0;
    }
    if (index >= 4) {
      return res
        .status(400)
        .json({ message: "index should be either 0, 1, 2 or 3" });
    }

    if (!user) {
      throw new Error("User parameter is required");
    }

    if (mode === undefined) {
      mode = "heman";
    }

    let dataWithValidImageURLs: FeedResponseDataItemsType[] = [];
    let data = {} as FeedResponseType;

    data = await getMediumRSSFeedDataFor(user);
    if (data) {
      let items = data.data;
      items.forEach((element: FeedResponseDataItemsType) => {
        let thumbnailImage = extractFirstImageUrl(element.description);
        if (thumbnailImage === "") {
          thumbnailImage = "https://placehold.co/600x400";
        }
        element.thumbnail = thumbnailImage;
        dataWithValidImageURLs.push(element);
      });
      var result = dataWithValidImageURLs[index];
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
