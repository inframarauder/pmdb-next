import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import { Layout } from "../../components/common";
import { connectDb } from "../../utils/db";
import Title from "../../models/title.model";
import styles from "../../styles/TitleDetails.module.css";

connectDb();

const TitleDetails = ({ title }) => {
	const [playerDimensions, setPlayerDimensions] = useState({
		width: 640,
		height: 360,
	});

	useEffect(() => {
		const handleResize = () => {
			const { innerWidth } = window;
			if (innerWidth > 1336) {
				setPlayerDimensions({
					width: 640,
					height: 360,
				});
			} else if (innerWidth <= 1336 && innerWidth > 480) {
				setPlayerDimensions({
					width: 320,
					height: 180,
				});
			} else if (innerWidth <= 400) {
				setPlayerDimensions({
					width: 250,
					height: 250 * (9 / 16),
				});
			}
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
								<div className={styles.streamingIconsContainer}>
									{title.streamingOn.map((streaming, index) => (
										<a
											key={index}
											href={streaming.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											<img
												src={`/images/${streaming.code}.png`}
												alt={streaming.name}
												className={styles.streamingIcon}
											/>
										</a>
									))}
								</div>
							)}
						</Col>

						<Col sm={12} md={6} lg={6}>
							<p className={styles.info}>
								<legend className={styles.infoTitle}>Trailer</legend>
								<hr />
								<ReactPlayer
									url={title.trailerLink}
									width={playerDimensions.width}
									height={playerDimensions.height}
									controls={true}
									style={{
										border: "10px solid var(--main-bg-color)",
										borderRadius: "10px",
									}}
								/>
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
	const data = await Title.find({}, { _id: 1 }).lean();
	const paths = data.map((title) => ({
		params: { titleId: title._id.toString() },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps(context) {
	const { titleId } = context.params;
	const data = await Title.findOne({ _id: titleId }).lean();
	const serializedData = JSON.parse(JSON.stringify(data));
	return {
		props: {
			title: serializedData,
		},
	};
}

export default TitleDetails;
