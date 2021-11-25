import React from "react";
import { connectDb } from "../../utils/db";
import Title from "../../models/title.model";

connectDb();

const TitleDetails = ({ title }) => {
	return <div>{title.name}</div>;
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
