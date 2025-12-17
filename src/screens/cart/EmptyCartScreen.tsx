import { StyleSheet, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import AppText from '../../components/AppText'
import { AppFonts } from '../../styles/fonts'
import { AppColors } from '../../styles/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import AppButton from '../../components/buttons/AppButton'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const EmptyCartScreen = () => {
  const navigation = useNavigation<any>()
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Ionicons
        name="bag-add-outline"
        size={s(80)}
        color={AppColors.primary}
        style={styles.icon}
      />

      <AppText style={styles.title}>
        {t('cart_empty_title')}
      </AppText>

      <AppText style={styles.subTitle}>
        {t('cart_empty_subtitle')}
      </AppText>

      <AppButton
        title={t('start_shopping')}
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  )
}

export default EmptyCartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: s(20),
  },
  title: {
    fontSize: s(20),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginBottom: vs(10),
  },
  subTitle: {
    fontSize: s(16),
    fontFamily: AppFonts.Medium,
    color: AppColors.medGray,
    textAlign: 'center',
    marginBottom: vs(20),
  },
  button: {
    width: '80%',
  },
  icon: {
    marginBottom: vs(10),
    opacity: 0.9,
  },
})
