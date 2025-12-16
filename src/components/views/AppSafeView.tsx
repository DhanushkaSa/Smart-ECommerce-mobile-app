import { Platform, StatusBar, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppColors } from '../../styles/colors'
import { IS_Android } from '../../constants/constants'

interface AppSafeAreaProps {
    children: ReactNode
    style?: ViewStyle
}

const AppSafeView = ({ children, style }: AppSafeAreaProps) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.container, style]}>{children}</View>
        </SafeAreaView>
    )
}

export default AppSafeView

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: AppColors.white,
        paddingTop: IS_Android ? StatusBar.currentHeight : 0,
    },

    container: {
        flex: 1,
    }
})