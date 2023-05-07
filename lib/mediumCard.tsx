const mediumCard = (props: {
	mode: string;
	result: FeedResponseDataItemsType;
}) => `
<svg fill="none" width="350" height="400" xmlns="http://www.w3.org/2000/svg">
	<foreignObject width="100%" height="100%">
		<div xmlns="http://www.w3.org/1999/xhtml">
			<style>
				/* BASIC STYLING */
				.container {
					width: 300px;
					display: flex;
					flex-direction: column;
					padding: 10px;
					border-radius: 5px;
				}

				img {
					border-radius: 5px;
				}

				.body {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-evenly;
				}

				.title,
				.description,
				.date {
					font-family: sans-serif;
					margin: 0;
					padding: 5px;
					text-align: center;
				}

				/* COLOR MODE SPECIFIC */

				/* LIGHT */
				.container-light {
					border: 1px solid black;
					background-color: #ffffff;
				}
				.title-light {
					color: black;
				}
				.description-light {
					color: #000000cc;
				}
				.date-light {
					color: #a0aec0;
				}

				/* DARK */
				.container-dark{
					background-color: #000000;
				}
				.title-dark {
					color: #ffffff;
				}
				.description-dark {
					color: #ffffffcc;
				}
				.date-dark {
					color: #a0aec0;
				}

				/* HEMAN */
				.container-heman{
					background-color: #0c131a;
				}
				.title-heman{
					color: #c9603b;
				}
				.description-heman {
					color: #ffffff;
				}
				.date-heman {
					color: #a0aec0;
				}

			</style>
			<div class="container container-${props.mode}">
				<div class="image">
					<img
						width="300px"
						src="${props.result.thumbnail}"
						alt="Image"
					/>
				</div>
				<div class="body">
					<h3 class="title title-${props.mode}">${props.result.title}</h3>
					<p class="description description-${props.mode}">
							${
								props.result.description
									.replace(
										/<h3>.*<\/h3>|<figcaption>.*<\/figcaption>|<[^>]*>/gm,
										""
									)
									.substring(0, 60) + "..."
							}
					</p>
					<small class="date date-${props.mode}">${props.result.pubDate}</small>
				</div>
			</div>
		</div>
	</foreignObject>
</svg>`;

export default mediumCard;
