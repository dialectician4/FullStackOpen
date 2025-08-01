import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.tab,
	},
	tab: {
		color: 'white'
	}
	// ...
});

const AppBar = () => {
	return (
		<View style={styles.container}>
			<Pressable>
				<Text style={styles.tab}>Repositories</Text>
			</Pressable>
		</View>
	)
};

export default AppBar;
