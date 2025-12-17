import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import AppSafeView from '../../components/views/AppSafeView'
import HomeHeader from '../../components/headers/HomeHeader'
import EmptyCartScreen from './EmptyCartScreen'
import CartItem from '../../components/cart/CartItem'
import TotalView from '../../components/cart/TotalView'
import { sharedPaddingHorizontal } from '../../styles/sharedStyle'
import AppButton from '../../components/buttons/AppButton'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import {
  addToCartItem,
  removeCartProduct,
  removeItemFromCart,
} from '../../store/reducers/cartSlice'
import { shippingFees, taxes } from '../../constants/constants'
import { useTranslation } from 'react-i18next'

const CartScreen = () => {
  const navigation = useNavigation<any>()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const items = useSelector((state: RootState) => state.cartSlice.items)

  const totalProductPricesSum = items.reduce(
    (acc, item) => acc + item.sum,
    0
  )

  const orderTotal = totalProductPricesSum + taxes + shippingFees

  return (
    <AppSafeView>
      <HomeHeader />

      {items.length > 0 ? (
        <View
          style={{
            paddingHorizontal: sharedPaddingHorizontal,
            flex: 1,
          }}
        >
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CartItem
                title={item.title}
                price={item.sum}
                imageURl={item.imageURL}
                qty={item.qty}
                onDeletePress={() =>
                  dispatch(removeCartProduct(item))
                }
                onIncreasePress={() =>
                  dispatch(addToCartItem(item))
                }
                onReducePress={() =>
                  dispatch(removeItemFromCart(item))
                }
              />
            )}
            showsVerticalScrollIndicator={false}
          />

          <TotalView
            itemPrice={totalProductPricesSum}
            orderTotal={orderTotal}
          />

          <AppButton
            title={t('continue')}
            onPress={() =>
              navigation.navigate('CheckoutScreen')
            }
          />
        </View>
      ) : (
        <EmptyCartScreen />
      )}
    </AppSafeView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})
