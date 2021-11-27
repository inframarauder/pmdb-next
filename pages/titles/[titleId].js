import React from "react";
import Link from "next/link";
import { Container, Row, Col, Popover, OverlayTrigger } from "react-bootstrap";
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
							<div className={styles.otherInfo}>
								<p className={styles.rating}>{title.rating}</p>
								<OverlayTrigger
									trigger="click"
									placement="bottom"
									overlay={
										<Popover id="popover-basic">
											<Popover.Header as="h3">Options</Popover.Header>
											<Popover.Body>
												<ul className={styles.optionsList}>
													<li className={styles.option}>
														<Link href={`/titles/edit/${title.id}`}>
															<a className={styles.optionLink}>
																<i className="fa fa-edit mx-1"></i>
																Edit
															</a>
														</Link>
													</li>
													<li className={styles.option}>
														<Link href={`/titles/${title._id}/#reviews`}>
															<a className={styles.optionLink}>
																<i className="fa fa-eye mx-1"></i>
																View Reviews
															</a>
														</Link>
													</li>
													<li className={styles.option}>
														<Link href={`/reviews/write`}>
															<a className={styles.optionLink}>
																<i className="fa fa-pencil mx-1"></i>Write
																Review
															</a>
														</Link>
													</li>
												</ul>
											</Popover.Body>
										</Popover>
									}
								>
									<div className={styles.optionsBtn}>
										<i
											className="fa fa-caret-square-o-down"
											aria-hidden="true"
										></i>{" "}
									</div>
								</OverlayTrigger>
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
