import axios from "axios";

const getMediumRSSFeedDataFor = async (user: string) => {
	const rssFeedURL =
		"https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@" +
		user;

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

export default getMediumRSSFeedDataFor;
