import { StyleSheet, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import AppText from '../AppText'
import { AppColors } from '../../styles/colors'
import { shippingFees, taxes } from '../../constants/constants'
import { useTranslation } from 'react-i18next'

interface TotalViewProps {
  itemPrice: number
  orderTotal: number
}

const TotalView = ({ itemPrice, orderTotal }: TotalViewProps) => {
  const { t } = useTranslation()

  return (
    <View>
      <View style={styles.row}>
        <AppText style={styles.textTitle}>
          {t('item_price')}:
        </AppText>
        <AppText style={styles.textPrice}>
          {t('currency_rs')}{itemPrice}
        </AppText>
      </View>

      <View style={styles.row}>
        <AppText style={styles.textTitle}>
          {t('taxes')}:
        </AppText>
        <AppText style={styles.textPrice}>
          {t('currency_rs')}{taxes}
        </AppText>
      </View>

      <View style={styles.row}>
        <AppText style={styles.textTitle}>
          {t('shipping_fees')}:
        </AppText>
        <AppText style={styles.textPrice}>
          {t('currency_rs')}{shippingFees}
        </AppText>
      </View>

      <View style={styles.separator} />

      <View style={styles.row}>
        <AppText style={styles.textTitle}>
          {t('order_total')}:
        </AppText>
        <AppText style={styles.textPrice}>
          {t('currency_rs')}{orderTotal}
        </AppText>
      </View>
    </View>
  )
}

export default TotalView

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vs(10),
  },
  textTitle: {
    fontSize: s(16),
    flex: 1,
  },
  textPrice: {
    fontSize: s(16),
    color: AppColors.primary,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: AppColors.blueGray,
    marginVertical: vs(5),
  },
})
