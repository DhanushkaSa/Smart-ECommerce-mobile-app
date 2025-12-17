import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import { AppFonts } from '../../styles/fonts'
import { AntDesign, FontAwesome } from "@expo/vector-icons"
import AppText from '../AppText'
import { useTranslation } from 'react-i18next'


const tempItem = {
    id: 1,
    price: 1199,
    title: "iPhone 16 Pro Max",
    imageURL:
        "https://2b.com.eg/media/catalog/product/cache/661473ab953cdcdf4c3b607144109b90/m/a/ma658.jpg",
}

interface CartItemProps {
    title: string
    price: number | number
    imageURl: string
    qty: number
    onDeletePress: () => void
    onIncreasePress: () => void
    onReducePress: () => void
}

const CartItem = ({ title, price, imageURl, qty, onDeletePress, onIncreasePress, onReducePress }: CartItemProps) => {

    const {t}=useTranslation()

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageURl }} style={styles.image} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.textPrice}>Rs. {price}</Text>
                <View style={styles.qtyContainer}>
                    <Pressable style={styles.iconsButton} onPress={onIncreasePress}>
                        <FontAwesome name='plus' size={s(12)} color={AppColors.primary} />
                    </Pressable>

                    <AppText style={styles.textQty}>{qty}</AppText>

                    <Pressable style={styles.iconsButton} onPress={onReducePress}>
                        <FontAwesome name='minus' size={s(12)} color={AppColors.primary} />
                    </Pressable>
                </View>

            </View>
            <View style={styles.deleteContainer}>
                <Pressable style={styles.deleteButton} onPress={onDeletePress}>
                    <AntDesign name='delete' size={s(14)} color={AppColors.redColor} />
                    <AppText style={styles.deleteText}>{t("delete")}</AppText>
                </Pressable>

            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        borderBottomWidth: 1,
        paddingBottom: vs(4),
        borderColor: AppColors.blueGray
    },
    imageContainer: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
    detailsContainer: {
        flex: 3.5,

    },
    deleteContainer: {
        flex: 1,
        justifyContent: "flex-end",
        paddingEnd: s(12),
        marginEnd: s(10)
    },
    image: {
        height: s(80),
        width: s(80),
        borderRadius: s(5),
    },
    titleText: {
        fontSize: s(14),
        color: AppColors.primary,
        fontFamily: AppFonts.Medium,
        marginTop: vs(5)

    },
    textPrice: {
        fontSize: s(16),
        color: AppColors.primary,
        fontFamily: AppFonts.Bold,
        marginVertical: vs(5)
    },
    deleteText: {
        marginLeft: 7,
        fontFamily: AppFonts.Medium,
        color: AppColors.medGray,
        fontSize: s(12),
        marginTop: 3
    },
    deleteButton: {
        flexDirection: "row",
        alignItems: "center",

    },

    qtyContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: s(5),
        borderRadius: s(30),
        borderWidth: s(1),
        borderColor: AppColors.blueGray,
        width: s(80),
        paddingVertical: vs(5)
    },

    iconsButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: AppColors.lightGray,
        padding: s(5),
        height: s(20),
        width: s(20),
        borderRadius: s(10)
    },
    textQty: {
        flex: 1,
        textAlign: "center",
        color: AppColors.primary
    }
})