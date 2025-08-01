import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		//marginTop: Constants.statusBarHeight,
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: theme.colors.absoluteBackground
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<RepositoryList />
		</View>
	);
};

export default Main;
