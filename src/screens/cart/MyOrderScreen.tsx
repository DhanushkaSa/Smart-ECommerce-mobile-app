import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrderItem from '../../components/cards/OrderItem'
import AppSafeView from '../../components/views/AppSafeView'
import { orderData } from '../../data/orderData'


const MyOrderScreen = () => {
    return (

       <FlatList
          data={orderData}
          keyExtractor={(item)=>item.id.toString()}
          renderItem={({item})=><OrderItem itemPrice={item.totalAmount} totalPrice={item.totalPrice} date={item.data} />}
       />

    )
}

export default MyOrderScreen

const styles = StyleSheet.create({})