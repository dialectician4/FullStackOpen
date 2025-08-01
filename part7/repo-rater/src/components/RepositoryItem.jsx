import { View, StyleSheet } from 'react-native';
import Text from './Text';
import MetricsList from './MetricsList';

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: 'white'
	},
	lang: {
		backgroundColor: 'blue',
		//flexShrink: 1,
		color: 'white'
	}
});

const numAbbrv = (num) => num < 1000 ? num : `${(num / 1000).toFixed(1)}k`;

const RepositoryItem = ({ fName, descr, lang, starCt, forkCt, revws, rates }) => {
	const labels = ["Stars", "Forks", "Reviews", "Rating"];
	//const [Stars, Forks, Reviews, Rating]
	const metrics = [
		starCt,
		forkCt,
		revws,
		rates
	].map((elt, i) => ({ label: labels[i], quantity: numAbbrv(elt) }));
	//console.log(`stars is ${Stars}`)

	return (
		<View style={styles.container}>
			<Text>Full name: {fName}</Text>
			<Text>Description: {descr}</Text>
			<View style={{ flexShrink: 1, flexDirection: 'row' }}>
				<Text style={styles.lang}>{lang}</Text>
			</View>
			<MetricsList metrics={metrics} />
		</View>
	)

	//<Text>Stars: {Stars}</Text>
	//<Text>Forks: {Forks}</Text>
	//<Text>Reviews: {Reviews}</Text>
	//<Text>Rating: {Rating}</Text>
};
export default RepositoryItem;
