import { Alert, Image, StyleSheet, Text, View } from 'react-native'
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
import * as yup from "yup"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../store/reducers/userSlice'

const schema = yup.object({
    userName: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    password: yup.string().required().min(6, "Password must be at least 6 characters"),
    email: yup.string().email("Email is invalid").required("Email is required"),
}).required()

type FormData = yup.InferType<typeof schema>

const SignUpScreen = () => {


    const navigation = useNavigation()
    const dispatch = useDispatch()

    const signUpOnPress = async (data: FormData) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            Alert.alert("User Created Successfully")

            navigation.navigate("MainAppBottomTabs")

            const userDataObj = {
                uid: userCredentials.user.uid
            }

            dispatch(setUserData(userDataObj))
        } catch (error: any) {
            let errorMessage = ""

            if (error.code === "auth/email-already-in-use") {
                errorMessage = "This email is already in use"
            } else if (error.code === "auth/invalid-email") {
                error.message = "The email address is invalid"
            } else if (error.code === "auth/weak-password") {
                error.message = "The password is too weak."
            } else {
                errorMessage = "An error occurred during sign-up."
            }

            showMessage({
                type: "danger",
                message: errorMessage
            })
        }

    }

    const { control, handleSubmit } = useForm<FormData>({
        resolver: yupResolver(schema),
    })
    return (
        <AppSafeView style={styles.container}>
            <Image source={IMAGES.appLogo} style={styles.logo} />
            <AppTextInputController control={control} name={"userName"} placeholder='Username' />
            <AppTextInputController control={control} name={"email"} placeholder='Email' />
            <AppTextInputController control={control} name={"password"} placeholder='Password' secureTextEntry />
            <AppText style={styles.appName}>Smart E-Commerce</AppText>
            <AppButton title='Create New Account' onPress={handleSubmit(signUpOnPress)} />

            <AppButton title='Go To Sign In' style={styles.signInButton} onPress={() => { navigation.navigate("SignInScreen") }} textColor={AppColors.primary} />
        </AppSafeView>
    )
}

export default SignUpScreen

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
    signInButton: {
        backgroundColor: AppColors.white,
        borderWidth: 1,
        marginTop: vs(15),
        borderColor: AppColors.primary,
    }
})