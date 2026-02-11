import Text from "./Text";
import { TextInput, Pressable, View } from "react-native";
import { useFormik } from "formik";
import * as yup from 'yup'

const onSubmit = (values) => {
	console.log(values)
}

const initialValues = {
	username: '',
	password: ''
}

const loginValidation = yup.object().shape({
	username: yup.string().min(1, "Username is required").required("Username is required"),
	password: yup.string().min(1, "Password is required").required("Password is required"),
});
// TODO: Running on change, should only run on submit

const LoginForm = ({ submitFn }) => {
	const formik = useFormik({
		initialValues,
		validationSchema: loginValidation,
		onSubmit: submitFn
	});
	// TODO: Implement red border around TextInputs on error with #d73a4a

	return (
		<View>
			<TextInput
				placeholder="username"
				value={formik.values.username}
				onChangeText={formik.handleChange('username')}
			/>
			{formik.touched.username && formik.errors.username && (<Text style={{ color: 'red' }}>{formik.errors.username}</Text>)}
			<TextInput
				placeholder="password"
				value={formik.values.password}
				onChangeText={formik.handleChange('password')}
				secureTextEntry
			/>
			{formik.touched.password && formik.errors.password && (<Text style={{ color: 'red' }}>{formik.errors.password}</Text>)}
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
