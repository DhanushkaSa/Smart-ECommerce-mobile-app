import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderItem from '../../components/cards/OrderItem'
import AppSafeView from '../../components/views/AppSafeView'
import { fetchUserOrders } from '../../config/dataServices'
import { getDateFromFireStoreTimeStampObject } from '../../helpers/dateTimeHelper'
import { useTranslation } from 'react-i18next'

const MyOrderScreen = () => {
  const [orderList, setOrderList] = useState([])
  const { t } = useTranslation()

  const getOrders = async () => {
    const response = await fetchUserOrders()
    setOrderList(response)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <AppSafeView>
      <FlatList
        data={orderList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OrderItem
            itemPrice={item.totalProductsPriceSum}
            totalPrice={item.totalPrice}
            date={getDateFromFireStoreTimeStampObject(item.createdAt)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('no_orders_yet')}</Text>
          </View>
        )}
      />
    </AppSafeView>
  )
}

export default MyOrderScreen

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
})
