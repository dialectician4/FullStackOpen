import { FlatList, StyleSheet, View } from "react-native";
import Text from "./Text";

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
	},
	separator: {
		width: 10,
	},
});
const ItemSeparator = () => <View style={styles.separator} />;

const Metric = ({ quantity, label }) => (<View>
	<Text>{quantity}</Text>
	<Text>{label}</Text>

</View>)

const MetricsList = ({ metrics }) => (
	<FlatList
		horizontal
		data={metrics}
		ItemSeparatorComponent={ItemSeparator}
		renderItem={({ item }) => <Metric
			quantity={item.quantity}
			label={item.label}
		/>}
		keyExtractor={item => item.label}
	/>)

export default MetricsList;
