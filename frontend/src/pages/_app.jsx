import 'antd/dist/antd.css';
import Head from 'next/head';
import '../styles/globals.css';
import StoreProvider from '../redux/store/StoreProvider';

export default function App({ Component, pageProps }) {
	return (
		<StoreProvider>
			<Head>
				<title>Pweeter</title>
			</Head>
			<Component {...pageProps} />
		</StoreProvider>
	);
}
