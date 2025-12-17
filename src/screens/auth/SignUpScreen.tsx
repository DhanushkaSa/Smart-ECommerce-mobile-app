import { Alert, Image, StyleSheet } from 'react-native'
import React, { useMemo } from 'react'
import AppSafeView from '../../components/views/AppSafeView'
import { sharedPaddingHorizontal } from '../../styles/sharedStyle'
import { IMAGES } from '../../constants/images-paths'
import { s, vs } from 'react-native-size-matters'
import AppText from '../../components/AppText'
import AppButton from '../../components/buttons/AppButton'
import { AppColors } from '../../styles/colors'
import { useNavigation } from '@react-navigation/native'
import AppTextInputController from '../../components/inputs/AppTextInputController'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../store/reducers/userSlice'
import { useTranslation } from 'react-i18next'

type FormData = {
  userName: string
  email: string
  password: string
}

const SignUpScreen = () => {
  const navigation = useNavigation<any>()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  /**
   * Schema inside component because of `t()`
   */
  const schema = useMemo(
    () =>
      yup.object({
        userName: yup
          .string()
          .min(3, t('name_min'))
          .required(t('name_required')),
        email: yup
          .string()
          .email(t('email_invalid'))
          .required(t('email_required')),
        password: yup
          .string()
          .min(6, t('password_min'))
          .required(t('password_min')),
      }),
    [t]
  )

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const signUpOnPress = async (data: FormData) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      dispatch(
        setUserData({
          uid: userCredentials.user.uid,
        })
      )

      Alert.alert(t('signup_success'))
      navigation.navigate('MainAppBottomTabs')
    } catch (error: any) {
      let errorMessage = t('signup_error')

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = t('email_in_use')
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = t('invalid_email')
      } else if (error.code === 'auth/weak-password') {
        errorMessage = t('weak_password')
      }

      showMessage({
        type: 'danger',
        message: errorMessage,
      })
    }
  }

  return (
    <AppSafeView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />

      <AppTextInputController
        control={control}
        name="userName"
        placeholder={t('username')}
      />

      <AppTextInputController
        control={control}
        name="email"
        placeholder={t('email')}
      />

      <AppTextInputController
        control={control}
        name="password"
        placeholder={t('password')}
        secureTextEntry
      />

      <AppText style={styles.appName}>{t('app_name')}</AppText>

      <AppButton
        title={t('create_account')}
        onPress={handleSubmit(signUpOnPress)}
      />

      <AppButton
        title={t('go_to_signin')}
        style={styles.signInButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate('SignInScreen')}
      />
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
  },
})
