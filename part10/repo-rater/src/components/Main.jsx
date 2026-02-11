import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';

const styles = StyleSheet.create({
	container: {
		//marginTop: Constants.statusBarHeight,
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: theme.colors.absoluteBackground
	},
});

const Main = ({ data }) => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route path="/" element={<RepositoryList data={data} />} />
				<Route path="*" element={<Navigate to="/" replace />} />
				<Route path="/signin" element={<SignIn />} />
			</Routes>
		</View>
	);
};
//<RepositoryList data={data} />

export default Main;
