import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import AppText from '../AppText'
import { AppColors } from '../../styles/colors'
import { shippingFees, taxes } from '../../constants/constants'

interface TotalViewProps {
    itemPrice: number,
    orderTotal: number
}
const TotalView = ({ itemPrice, orderTotal }: TotalViewProps) => {
    return (
        <View>
            <View style={styles.row}>
                <AppText style={styles.textTitle}>Item Price:</AppText>
                <AppText style={styles.textPrice}>Rs.{itemPrice}</AppText>
            </View>

            <View style={styles.row}>
                <AppText style={styles.textTitle}>Taxes:</AppText>
                <AppText style={styles.textPrice}>Rs.{taxes}</AppText>
            </View>

            <View style={styles.row}>
                <AppText style={styles.textTitle}>Shipping Fees:</AppText>
                <AppText style={styles.textPrice}>Rs.{shippingFees}</AppText>
            </View>

            <View style={styles.separator} />

            <View style={styles.row}>
                <AppText style={styles.textTitle}>Order Total:</AppText>
                <AppText style={styles.textPrice}>Rs.{orderTotal}</AppText>
            </View>

        </View>
    )
}

export default TotalView

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: vs(10)
    },
    textTitle: {
        fontSize: s(16),
        flex: 1
    },
    textPrice: {
        fontSize: s(16),
        color: AppColors.primary
    },
    separator: {
        height: 1,
        width: "100%",
        backgroundColor: AppColors.blueGray,
        marginVertical: vs(5)
    }
})