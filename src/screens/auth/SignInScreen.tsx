import { Image, StyleSheet } from 'react-native'
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
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import { showMessage } from 'react-native-flash-message'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../store/reducers/userSlice'
import { useTranslation } from 'react-i18next'

type FormData = {
  email: string
  password: string
}

const SignInScreen = () => {
  const navigation = useNavigation<any>()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  /**
   * ✅ Schema MUST be inside component
   * because it uses `t()` (translations)
   */
  const schema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email(t('email_invalid'))
          .required(t('email_required')),
        password: yup
          .string()
          .min(6, t('password_min_length'))
          .required(t('password_required')),
      }),
    [t]
  )

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onLoginPress = async (data: FormData) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      dispatch(
        setUserData({
          uid: userCredentials.user.uid,
        })
      )

      navigation.navigate('MainAppBottomTabs')
    } catch (error: any) {
      let errorMessage = t('signin_error')

      if (error.code === 'auth/user-not-found') {
        errorMessage = t('user_not_found')
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = t('wrong_credentials')
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
        title={t('signin_button')}
        onPress={handleSubmit(onLoginPress)}
      />

      <AppButton
        title={t('signup')}
        style={styles.registerButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate('SignUpScreen')}
      />
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
  },
})
