import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight + 10,
		backgroundColor: theme.colors.tab,
	},
	tab: {
		color: 'white'
	},
	asRow: {
		flexDirection: 'row',
		gap: 10
	}
	// ...
});

const AppBar = () => {
	return (
		<View style={[styles.container, styles.asRow]}>
			<ScrollView contentContainerStyle={styles.asRow} horizontal>
				<Pressable>
					<Link to="/">
						<Text style={styles.tab}>Repositories</Text>
					</Link>
				</Pressable>
				<Pressable>
					<Link to="/signin">
						<Text style={styles.tab}>Sign in</Text>
					</Link>
				</Pressable>
			</ScrollView>
		</View>
	)
};

export default AppBar;
