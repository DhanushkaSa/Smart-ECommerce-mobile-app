import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import AppText from '../AppText'
import { AppFonts } from '../../styles/fonts'
import Ionicons from '@expo/vector-icons/Ionicons'
import { commonStyles } from '../../styles/sharedStyle'

interface ProductCardProps {
    onAddToCardPress: () => void,
    title: string,
    price: number,
    imageURL: string
}

const ProductCard = ({ onAddToCardPress, title, price, imageURL }: ProductCardProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addToCartButton} onPress={onAddToCardPress}>
                <Ionicons name='cart' size={s(20)} color={AppColors.white} />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: imageURL }} />
            </View>

            <View style={styles.detailsContainer}>
                <AppText style={styles.titleText}>{title}</AppText>
                <AppText style={styles.priceText}>Rs. {price}</AppText>
            </View>
        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    container: {
        width: s(160),
        height: vs(190),
        backgroundColor: AppColors.white,
        borderRadius: s(10),
        ...commonStyles.shadow
    },
    imageContainer: {
        overflow: "hidden",
        borderTopLeftRadius: s(10),
        borderTopRightRadius: s(10),
        height: vs(110)
    },

    image: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
    },

    detailsContainer: {
        flex: 1,
        paddingTop: s(8),
        paddingBottom: vs(15),
        paddingHorizontal: s(10),

    },
    titleText: {
        fontSize: s(14),
        fontFamily: AppFonts.Medium,
        color: AppColors.primary
    },
    priceText: {
        fontSize: s(14),
        fontFamily: AppFonts.Bold,
        color: AppColors.primary,
        marginTop: vs(7)
    },
    addToCartButton: {
        height: s(35),
        width: s(35),
        position: "absolute",
        left: 5,
        top: 5,
        borderRadius: s(18),
        backgroundColor: AppColors.primary,
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})