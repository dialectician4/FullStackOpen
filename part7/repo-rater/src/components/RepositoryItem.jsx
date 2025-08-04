import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import MetricsList from './MetricsList';

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		//flexShrink: 1,
		backgroundColor: 'white',
		padding: 10,
		gap: 10,
	},
	lang: {
		backgroundColor: 'blue',
		//flexShrink: 1,
		color: 'white'
	},
	pic: {
		width: 50,
		height: 50
	},
	asRow: {
		flexDirection: 'row'
	}
});

const numAbbrv = (num) => num < 1000 ? num : `${(num / 1000).toFixed(1)}k`;

const RepositoryItem = ({ fName, descr, lang, starCt, forkCt, revws, rates, img }) => {
	const labels = ["Stars", "Forks", "Reviews", "Rating"];
	//const [Stars, Forks, Reviews, Rating]
	const metrics = [
		starCt,
		forkCt,
		revws,
		rates
	].map((elt, i) => ({ label: labels[i], quantity: numAbbrv(elt) }));
	//console.log(`stars is ${Stars}`)
	console.log(`Path is ${img}`)

	return (
		<View style={styles.container} >
			<View style={[styles.container, styles.asRow]}>
				<Image style={styles.pic} source={img} />
				<View style={{ flex: 1 }}>
					<Text fontWeight={'bold'}>{fName}</Text>
					<Text style={{ flexShrink: 1 }} >{descr}</Text>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.lang}>{lang}</Text>
					</View>
				</View>
			</View>
			<View style={{ flex: 1, flexGrow: 1, flexDirection: 'row', justifyContent: 'center' }}>
				<MetricsList metrics={metrics} />
			</View>
		</View>
	)

	//<Text>Stars: {Stars}</Text>
	//<Text>Forks: {Forks}</Text>
	//<Text>Reviews: {Reviews}</Text>
	//<Text>Rating: {Rating}</Text>
};
export default RepositoryItem;
