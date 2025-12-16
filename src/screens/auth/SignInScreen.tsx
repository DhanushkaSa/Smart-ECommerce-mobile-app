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

const SignInScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()

    return (
        <AppSafeView style={styles.container}>
            <Image source={IMAGES.appLogo} style={styles.logo} />
            <AppTextInput placeholder='Email' onChangeText={setEmail} />
            <AppTextInput placeholder='Password' onChangeText={setPassword} secureTextEntry />
            <AppText style={styles.appName}>Smart E-Commerce</AppText>
            <AppButton title='Login' onPress={() => { navigation.navigate("MainAppBottomTabs") }} />

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