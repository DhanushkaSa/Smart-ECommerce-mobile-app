import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppSafeView from '../../components/views/AppSafeView'
import { commonStyles, sharedPaddingHorizontal } from '../../styles/sharedStyle'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import AppButton from '../../components/buttons/AppButton'
import AppTextInputController from '../../components/inputs/AppTextInputController'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { shippingFees, taxes } from '../../constants/constants'
import { addDoc, collection, doc } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'
import { emptyCart } from '../../store/reducers/cartSlice'
import { useTranslation } from 'react-i18next'

const CheckoutScreen = () => {
  const { t } = useTranslation()
  const { userData } = useSelector((state: RootState) => state.userSlice)
  const { items } = useSelector((state: RootState) => state.cartSlice)

  const totalProductsPriceSum = items.reduce((acc, item) => acc + item.sum, 0)
  const totalPrice = totalProductsPriceSum + taxes + shippingFees

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const schema = yup.object({
    fullName: yup.string()
      .required(t('name_required'))
      .min(3, t('name_min')),
    phoneNumber: yup.string()
      .required(t('phone_required'))
      .matches(/^[0-9]+$/, t('phone_number_invalid'))
      .min(10, t('phone_length')),
    detailedAddress: yup.string()
      .required(t('address_required'))
      .min(15, t('address_min'))
  }).required()

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const saveOrder = async (formData: any) => {
    try {
      const orderBody = {
        ...formData,
        items,
        totalProductsPriceSum,
        createdAt: new Date(),
        totalPrice
      }

      const userOrderRef = collection(doc(db, "users", userData.uid), "orders")
      await addDoc(userOrderRef, orderBody)

      const orderRef = collection(db, "orders")
      await addDoc(orderRef, orderBody)

      showMessage({
        type: "success",
        message: t('order_success')
      })

      navigation.goBack()
      dispatch(emptyCart())
    } catch (error) {
      console.log("Error saving order: ", error)
      showMessage({
        type: "danger",
        message: t('order_error')
      })
    }
  }

  return (
    <AppSafeView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputContainer}>
          <AppTextInputController control={control} name="fullName" placeholder={t('full_name')} />
          <AppTextInputController control={control} name="phoneNumber" placeholder={t('phone_number')} />
          <AppTextInputController control={control} name="detailedAddress" placeholder={t('detailed_address')} />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <AppButton title={t('confirm')} style={{ marginBottom: vs(10) }} onPress={handleSubmit(saveOrder)} />
      </View>
    </AppSafeView>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({
  inputContainer: {
    ...commonStyles.shadow,
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
    paddingTop: vs(15)
  },
  bottomButtonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    bottom: s(10),
    width: "100%",
    borderTopWidth: 1,
    borderColor: AppColors.blueGray,
    paddingTop: vs(10)
  }
})
