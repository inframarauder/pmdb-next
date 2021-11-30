import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { Context as AuthContext } from "../../contexts/AuthContext";

const Layout = ({ privatePage, admin, children }) => {
	const { state } = useContext(AuthContext);
	const router = useRouter();

	useEffect(() => {
		const { user } = state;
		if ((privatePage && !user) || (admin && !user?.isAdmin)) {
			router.push("/login");
		}
	}, []);

	return (
		<>
			<Head>
				<title>PMDb Next!</title>
				<meta name="description" content="The next.js version of PMDb" />
				<link rel="icon" href="/favicon.jpg" />
			</Head>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
