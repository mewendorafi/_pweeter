export default function Loading() {
	return (
		<div style={styles.container}>
			<h3 style={styles.title}>
				⏳ Please wait while you are being redirected... ⌛️
			</h3>
		</div>
	);
}

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
	},
	title: {
		color: 'black',
	},
};
