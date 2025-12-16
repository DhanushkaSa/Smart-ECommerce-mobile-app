import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSafeView from '../../components/views/AppSafeView'
import HomeHeader from '../../components/headers/HomeHeader'
import { AppFonts } from '../../styles/fonts'
import ProductCard from '../../components/cards/ProductCard'
import { products } from '../../data/products'
import { s, vs } from 'react-native-size-matters'
import { useDispatch } from 'react-redux'
import { addToCartItem } from '../../store/reducers/cartSlice'


const HomeScreen = () => {

  const dispatch = useDispatch()
  return (
    <AppSafeView>

      <HomeHeader />
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ProductCard title={item.title} price={item.price} imageURL={item.imageURL} onAddToCardPress={() => dispatch(addToCartItem(item))} />}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: vs(10),
          marginTop: vs(20)

        }}

        contentContainerStyle={{
          paddingHorizontal: s(10)
        }}
      />

    </AppSafeView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})