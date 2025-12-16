import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSafeView from '../../components/views/AppSafeView'
import { commonStyles, sharedPaddingHorizontal } from '../../styles/sharedStyle'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import AppTextInput from '../../components/inputs/AppTextInput'
import AppButton from '../../components/buttons/AppButton'

const CheckoutScreen = () => {
    return (
        <AppSafeView>
            <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
                <View style={styles.inputContainer}>
                    <AppTextInput placeholder='Full Name' />
                    <AppTextInput placeholder='Phone Number' />
                    <AppTextInput placeholder='Detailed Address' />
                </View>
            </View>

            <View style={styles.bottomButtonContainer}>
                <AppButton title='Confirm' style={{ marginBottom:vs(10) }}/>
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
        paddingTop:vs(15)
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