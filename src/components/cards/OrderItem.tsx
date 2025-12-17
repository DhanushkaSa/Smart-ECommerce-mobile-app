import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppText from '../AppText'
import { commonStyles, sharedPaddingHorizontal } from '../../styles/sharedStyle'
import { s, vs } from 'react-native-size-matters'
import { AppFonts } from '../../styles/fonts'
import { AppColors } from '../../styles/colors'
import { useTranslation } from 'react-i18next'

interface OrderItemProps {
  itemPrice: number
  totalPrice: string
  date: string
}

const OrderItem = ({ itemPrice, totalPrice, date }: OrderItemProps) => {
  const { t } = useTranslation()

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <AppText style={styles.titleText}>{t('order_details')}</AppText>
        <View style={styles.splitter} />
        <View style={styles.details}>
          <AppText style={styles.title}>
            {t('order_total_price')} Rs.{totalPrice}
          </AppText>
          <AppText style={styles.subTitle}>Rs.{itemPrice}</AppText>
        </View>

        <View style={styles.details}>
          <AppText style={styles.title}>
            {t('order_date')} {date}
          </AppText>
        </View>
      </View>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: sharedPaddingHorizontal,
    ...commonStyles.shadow,
    marginHorizontal: s(10),
    paddingVertical: vs(10),
    backgroundColor: AppColors.white,
    borderRadius: s(10),
  },
  titleText: {
    fontSize: s(16),
    marginBottom: vs(10),
    fontFamily: AppFonts.Bold,
  },
  splitter: {
    width: '100%',
    height: 1,
    backgroundColor: AppColors.primary,
  },
  details: {
    marginTop: vs(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: s(14),
    fontFamily: AppFonts.Medium,
  },
  subTitle: {
    fontSize: s(14),
    color: AppColors.secondaryColor,
  },
  mainContainer: {
    marginVertical: vs(8),
  },
})
