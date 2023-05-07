type FeedResponseDataItemsType = {
	title: string;
	pubDate: string;
	link: string;
	guid: string;
	author: string;
	thumbnail: string;
	description: string;
	content: string;
	enclosure: object;
	categories: string[];
};

type FeedResponseType = {
	data: FeedResponseDataItemsType[];
	message: string;
};

type FeedResponseDataType = {
	status: string;
	feed: object;
	items: FeedResponseDataItemsType[];
};
