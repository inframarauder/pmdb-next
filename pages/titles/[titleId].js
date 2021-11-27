import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../../components/common";
import { StreamingData, TrailerPlayer } from "../../components/Titles";
import styles from "../../styles/TitleDetails.module.css";

import {
	getTitles,
	readTitle,
} from "../../utils/backend/services/title.service";

const TitleDetails = ({ title }) => {
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
							<span className={styles.rating}>{title.rating}</span>
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
				<Container className={styles.reviews}></Container>
			</Container>
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
	const data = await readTitle({ _id: titleId });
	const serializedData = JSON.parse(JSON.stringify(data));
	return {
		props: {
			title: serializedData,
		},
	};
}

export default TitleDetails;
