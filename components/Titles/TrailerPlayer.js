import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";

const TrailerPlayer = ({ url }) => {
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
			} else if (innerWidth <= 1336 && innerWidth > 400) {
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
		<ReactPlayer
			url={url}
			width={playerDimensions.width}
			height={playerDimensions.height}
			controls={true}
			style={{
				border: "10px solid var(--main-bg-color)",
				borderRadius: "10px",
			}}
		/>
	);
};

export default TrailerPlayer;
