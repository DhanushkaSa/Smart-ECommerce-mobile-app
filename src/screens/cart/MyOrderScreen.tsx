import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderItem from '../../components/cards/OrderItem'
import AppSafeView from '../../components/views/AppSafeView'
import { orderData } from '../../data/orderData'
import { fetchUserOrders } from '../../config/dataServices'
import { getDateFromFireStoreTimeStampObject } from '../../helpers/dateTimeHelper'


const MyOrderScreen = () => {

   const [orderList, setOrderList] = useState([])

   const getOrders = async () => {
      const response = await fetchUserOrders()
      setOrderList(response)
   }

   useEffect(() => {
      getOrders()
   }, [])

   return (

      <FlatList
         data={orderList}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({ item }) => <OrderItem itemPrice={item.totalProductsPriceSum} totalPrice={item.totalPrice} date={getDateFromFireStoreTimeStampObject(item.createdAt)} />}
      />

   )
}

export default MyOrderScreen

const styles = StyleSheet.create({})