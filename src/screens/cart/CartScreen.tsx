import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSafeView from '../../components/views/AppSafeView'
import HomeHeader from '../../components/headers/HomeHeader'
import EmptyCartScreen from './EmptyCartScreen'
import CartItem from '../../components/cart/CartItem'
import TotalView from '../../components/cart/TotalView'
import { products } from '../../data/products'
import { sharedPaddingHorizontal } from '../../styles/sharedStyle'
import AppButton from '../../components/buttons/AppButton'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { addToCartItem, removeCartProduct, removeItemFromCart } from '../../store/reducers/cartSlice'
import { shippingFees, taxes } from '../../constants/constants'

const CartScreen = () => {

  const navigate = useNavigation()
  const item = useSelector((state: RootState) => state.cartSlice.items)
  console.log(item)
  const dispatch = useDispatch()
  const totalProductPricesSum = item.reduce((acc, item) => acc + item.sum, 0)
  const orderTotal = totalProductPricesSum + taxes + shippingFees

  return (
    <AppSafeView>

      <HomeHeader />

      {
        item.length > 0 ?
          <View style={{ paddingHorizontal: sharedPaddingHorizontal, flex: 1 }}>
            <FlatList
              data={item}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return <CartItem title={item.title} price={item.sum} imageURl={item.imageURL} qty={item.qty} onDeletePress={() => { dispatch(removeCartProduct(item)) }} onIncreasePress={() => { dispatch(addToCartItem(item)) }} onReducePress={() => { dispatch(removeItemFromCart(item)) }} />
              }}

              showsVerticalScrollIndicator={false}
            />

            <TotalView itemPrice={totalProductPricesSum} orderTotal={orderTotal} />
            <AppButton title='Continue' onPress={() => { navigate.navigate("CheckoutScreen") }} />
          </View>
          : <EmptyCartScreen />
      }



    </AppSafeView>
  )
}

export default CartScreen

const styles = StyleSheet.create({})