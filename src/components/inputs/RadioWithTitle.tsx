import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import { sharedPaddingHorizontal } from '../../styles/sharedStyle'
import AppText from '../AppText'

interface RadioWithTitleProps {
    title: string
    selected: boolean
    onPress?: () => void
}

const RadioWithTitle = ({ title, selected, onPress }: RadioWithTitleProps) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.circle}>
                {
                    selected && <View style={styles.innerCircle}></View>
                }
            </View>

            <AppText>{title}</AppText>
        </TouchableOpacity>
    )
}

export default RadioWithTitle

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: vs(10)
    },
    circle: {
        height: s(20),
        width: s(20),
        borderRadius: s(100),
        borderColor: AppColors.black,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: s(10)
    },
    innerCircle: {
        height: s(12),
        width: s(12),
        borderRadius: s(50),
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: s(10),
        backgroundColor: AppColors.black

    }
})