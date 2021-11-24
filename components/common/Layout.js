import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>PMDb Next!</title>
				<meta name="description" content="The next.js version of PMDb" />
				<link rel="icon" href="/images/favicon.ico" />
			</Head>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
