import Text from "./Text";
import { TextInput, Pressable, View } from "react-native-web";
import { useFormik } from "formik";

const onSubmit = (values) => {
	console.log(values)
}

const initialValues = {
	username: '',
	password: ''
}

const LoginForm = ({ submitFn }) => {
	const formik = useFormik({
		initialValues,
		onSubmit: submitFn
	});

	return (
		<View>
			<TextInput
				placeholder="username"
				value={formik.values.username}
				onChangeText={formik.handleChange('username')}
			/>
			<TextInput
				placeholder="password"
				value={formik.values.password}
				onChangeText={formik.handleChange('password')}
				secureTextEntry
			/>
			<Pressable onPress={formik.handleSubmit}>
				<Text>Submit</Text>
			</Pressable>
		</View>
	)
}

const SignIn = () => {
	return (
		<View>
			<Text>The sign in view</Text>
			<LoginForm submitFn={onSubmit} />
		</View>
	)
}
export default SignIn;
