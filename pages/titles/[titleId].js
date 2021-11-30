import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../../components/common";
import {
	StreamingData,
	TrailerPlayer,
	TitleDetailsOptions,
	ReviewCard,
} from "../../components/Titles";
import styles from "../../styles/TitleDetails.module.css";

import {
	getTitles,
	readTitle,
} from "../../utils/backend/services/title.service";
import { getReviews } from "../../utils/backend/services/review.service";

const TitleDetails = ({ title, reviews }) => {
	return (
		<Layout>
			<Container fluid className={styles.titleDetailsContainer}>
				<Container className={styles.titleDetails}>
					<Row>
						<div className={styles.titleSection}>
							<div className={styles.titleInfo}>
								<legend>
									{title.name} ({title.year})
								</legend>
								<span>
									{title.language} - {title.genres}
								</span>
								<br />
								<span>Runtime - {title.runtime} mins.</span>
							</div>
							<div className={styles.otherInfo}>
								<p className={styles.rating}>{title.rating}</p>
								<TitleDetailsOptions titleId={title._id} />
							</div>
						</div>

						<hr />
						<Col sm={12} md={6} lg={6} className={styles.posterContainer}>
							<img
								src={title.poster}
								alt={title.name}
								className={styles.poster}
							/>
							{title.streamingOn.length > 0 && (
								<StreamingData streamingOn={title.streamingOn} />
							)}
						</Col>

						<Col sm={12} md={6} lg={6}>
							<p className={styles.info}>
								<legend className={styles.infoTitle}>Trailer</legend>
								<hr />
								<TrailerPlayer url={title.trailerLink} />
							</p>
							<p className={styles.info}>
								<legend className={styles.infoTitle}>Plot</legend>
								<hr />
								{title.plot}
							</p>
						</Col>
					</Row>
					<p className={styles.info}>
						<legend className={styles.infoTitle}>Cast</legend>
						<hr />
						{title.cast}
					</p>
					<p className={styles.info}>
						<legend className={styles.infoTitle}>Director(s)</legend>
						<hr />
						{title.directedBy}
					</p>
					<p className={styles.info}>
						<legend className={styles.infoTitle}>Writer(s)</legend>
						<hr />
						{title.writtenBy}
					</p>
				</Container>
			</Container>
			<div id="reviews">
				<legend className="text-center my-4">Reviews</legend> <hr />
				<Container className={styles.reviews}>
					{reviews.length > 0 ? (
						<>
							<p className="text-center">{reviews.length} review(s) found...</p>
							{reviews.map((review) => (
								<ReviewCard review={review} key={review._id} />
							))}
						</>
					) : (
						<p className="text-center">No reviews yet.</p>
					)}
				</Container>
			</div>
		</Layout>
	);
};

export async function getStaticPaths() {
	const data = await getTitles({}, ["_id"]);
	const paths = data.map((title) => ({
		params: { titleId: title._id.toString() },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps(context) {
	const { titleId } = context.params;
	const title = await readTitle({ _id: titleId });
	const reviews = await getReviews(title._id);
	const serializedData = JSON.parse(JSON.stringify({ title, reviews }));
	return {
		props: {
			title: serializedData.title,
			reviews: serializedData.reviews,
		},
	};
}

export default TitleDetails;
