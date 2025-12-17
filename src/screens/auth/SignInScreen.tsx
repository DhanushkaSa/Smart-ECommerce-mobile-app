import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppSafeView from '../../components/views/AppSafeView'
import { sharedPaddingHorizontal } from '../../styles/sharedStyle'
import { IMAGES } from '../../constants/images-paths'
import { s, vs } from 'react-native-size-matters'
import AppTextInput from '../../components/inputs/AppTextInput'
import AppText from '../../components/AppText'
import AppButton from '../../components/buttons/AppButton'
import { AppColors } from '../../styles/colors'
import { useNavigation } from '@react-navigation/native'
import AppTextInputController from '../../components/inputs/AppTextInputController'
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../store/reducers/userSlice'



const schema = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
}).required()

type FormData = yup.InferType<typeof schema>

const SignInScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const onLoginPress = async (data: FormData) => {

        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            navigation.navigate("MainAppBottomTabs")
            console.log(JSON.stringify(userCredentials, null, 3));

            const userDataObj = {
                uid: userCredentials.user.uid
            }

            dispatch(setUserData(userDataObj))
            console.log(data)
        } catch (error: any) {
            console.log(error)
            let errorMessage = ""
            if (error.code == "auth/user-not-found") {
                errorMessage = "User not found"
            } else if (error.code === "auth/invalid-credential") {
                errorMessage = "Wrong email or password"
            } else {
                errorMessage = "An error occurred during sign-in "
            }

            showMessage({
                type: "danger",
                message: errorMessage,
            })
        }

    }

    const { control, handleSubmit } = useForm<FormData>({
        resolver: yupResolver(schema),
    })

    return (
        <AppSafeView style={styles.container}>
            <Image source={IMAGES.appLogo} style={styles.logo} />
            <AppTextInputController control={control} name={"email"} placeholder='Email' />
            <AppTextInputController control={control} name={"password"} placeholder='Password' secureTextEntry />
            <AppText style={styles.appName}>Smart E-Commerce</AppText>
            <AppButton title='Login' onPress={handleSubmit(onLoginPress)} />

            <AppButton title='Sign Up' style={styles.registerButton} onPress={() => { navigation.navigate("SignUpScreen") }} textColor={AppColors.primary} />
        </AppSafeView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: sharedPaddingHorizontal,
    },
    logo: {
        height: s(150),
        width: s(150),
        marginBottom: vs(30),
    },
    appName: {
        fontSize: s(16),
        marginBottom: vs(20),

    },
    registerButton: {
        backgroundColor: AppColors.white,
        borderWidth: 1,
        marginTop: vs(15),
        borderColor: AppColors.primary,
    }
})