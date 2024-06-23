import axios from "axios";

export const getMediumRSSFeedDataFor = async (user: string) => {
  const rssFeedURL = `https://api.rss2json.com/v1/api.json?api_key=${process.env.RSS_API_KEY}&rss_url=https://medium.com/feed/@${user}&count=4`;

	try {
		const { data, status } = await axios.get<FeedResponseDataType>(rssFeedURL);

		if (status === 200) {
			return {
				isError: false,
				data: data.items,
				message: "Success",
			} as FeedResponseType;
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw error.message;
		} else {
			throw "Failed";
		}
	}
	throw "Something Failed. Please try again later";
};

export const extractFirstImageUrl = (description: string) => {
  // Regular expression to find the first src attribute of an img tag
  const imgSrcRegex = /https:\/\/[^"]+/g;
  
  const match = description.match(imgSrcRegex);
  if (match && match.length > 0) {
	  return match[0];
  }
  else {
	return ""
  }
}