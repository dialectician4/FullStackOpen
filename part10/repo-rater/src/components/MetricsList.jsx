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
	metrics: {
		flexGrow: 1,
		textAlign: 'center'
	}
});
const ItemSeparator = () => <View style={styles.separator} />;

const Metric = ({ quantity, label }) => (<View style={styles.metrics}>
	<Text fontWeight={'bold'} style={styles.metrics}>{quantity}</Text>
	<Text style={styles.metrics}>{label}</Text>

</View>)

const MetricsList = ({ metrics }) => (
	<FlatList
		horizontal
		//style={{ flexGrow: 1, flexDirection: 'row' }}
		contentContainerStyle={{ flex: 1, flexGrow: 1, justifyContent: 'space-around', }} // alignItems: "stretch" 
		data={metrics}
		ItemSeparatorComponent={ItemSeparator}
		renderItem={({ item }) => <Metric
			quantity={item.quantity}
			label={item.label}
		/>}
		keyExtractor={item => item.label}
	/>)

export default MetricsList;
