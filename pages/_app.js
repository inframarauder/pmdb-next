import { Provider as TitlesProvider } from "../contexts/TitlesContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<TitlesProvider>
			<Component {...pageProps} />
		</TitlesProvider>
	);
}

export default MyApp;
