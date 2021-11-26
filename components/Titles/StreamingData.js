import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styles from "../../styles/TitleDetails.module.css";

const StreamingData = ({ streamingOn }) => {
	return (
		<>
			<legend className="text-center my-2">Streaming On </legend>
			<div className={styles.streamingIconsContainer}>
				{streamingOn.map((streaming, index) => (
					<OverlayTrigger
						key={index}
						placement="bottom"
						overlay={<Tooltip>{streaming.name}</Tooltip>}
					>
						<a href={streaming.url} target="_blank" rel="noopener noreferrer">
							<img
								src={`/images/${streaming.code}.png`}
								alt={streaming.name}
								className={styles.streamingIcon}
							/>
						</a>
					</OverlayTrigger>
				))}
			</div>
		</>
	);
};

export default StreamingData;
