import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

//
//const RepositoryItem = ({ fName, descr, lang, stars, forks, revws, rates }) => (
//	<View>
//		<Text>Full name: {fName}</Text>
//		<Text>Description: {descr}</Text>
//		<Text>Language: {lang}</Text>
//		<Text>Stars: {stars}</Text>
//		<Text>Forks: {forks}</Text>
//		<Text>Reviews: {revws}</Text>
//		<Text>Rating: {rates}</Text>
//	</View>
//);
//
const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ data }) => {
	return (
		<FlatList
			data={data}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <RepositoryItem
				fName={item.fullName}
				descr={item.description}
				lang={item.language}
				starCt={item.stargazersCount}
				forkCt={item.forksCount}
				revws={item.reviewCount}
				rates={item.ratingAverage}
				img={item.imgPath}
			/>}
			keyExtractor={item => item.id}
		/>
	);
};

export default RepositoryList;
