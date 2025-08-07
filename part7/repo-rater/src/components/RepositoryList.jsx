import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
	separator: {
		height: 10,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ data }) => {
	const { repositories } = useRepositories();
	const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];
	return (
		<FlatList
			data={repositoryNodes}
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
