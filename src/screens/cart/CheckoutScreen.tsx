import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSafeView from '../../components/views/AppSafeView'
import { commonStyles, sharedPaddingHorizontal } from '../../styles/sharedStyle'
import { s, vs } from 'react-native-size-matters'
import { AppColors } from '../../styles/colors'
import AppTextInput from '../../components/inputs/AppTextInput'
import AppButton from '../../components/buttons/AppButton'
import AppTextInputController from '../../components/inputs/AppTextInputController'
import { useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { shippingFees, taxes } from '../../constants/constants'
import { addDoc, collection, doc } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'
import { emptyCart } from '../../store/reducers/cartSlice'


const schema = yup.object({
    fullName: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
    phoneNumber: yup.string().required("Phone Number is required").matches(/^[0-9]+$/, "Phone Number must be a number").min(10, "Phone Number must be 10 digits"),
    detailedAddress: yup.string().required("Address is required").min(15, "Address must be at least 15 characters"),
}).required()

type FormData = yup.InferType<typeof schema>


const CheckoutScreen = () => {

    const { userData } = useSelector((state: RootState) => state.userSlice)
    const { items } = useSelector((state: RootState) => state.cartSlice)
    const totalProductsPriceSum = items.reduce((acc, item) => acc + item.sum, 0)
    const totalPrice = totalProductsPriceSum + taxes + shippingFees

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    console.log("---------------------------------------------")
    console.log(JSON.stringify(userData, null, 3));
    console.log("---------------------------------------------")


    const saveOrder = async (formData: FormData) => {

        try {
            const orderBody = {
                ...formData,
                items,
                totalProductsPriceSum,
                createdAt: new Date(),
                totalPrice


            }

            const userOrderRef = collection(doc(db, "users", userData.uid), "orders");
            await addDoc(userOrderRef, orderBody)

            const orderRef=collection(db,"orders")
            await addDoc(orderRef, orderBody)

            showMessage({
                type: "success",
                message: "Order Placed Successfully"
            })

            navigation.goBack()
            console.log(formData)
            dispatch(emptyCart())
        } catch (error) {
            console.log("Error saving order: ", error)
            showMessage({
                type: "danger",
                message: "Error Happen"
            })
        }
    }

    return (
        <AppSafeView>
            <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
                <View style={styles.inputContainer}>
                    <AppTextInputController control={control} name={"fullName"} placeholder='Full Name' />
                    <AppTextInputController control={control} name={"phoneNumber"} placeholder='Phone Number' />
                    <AppTextInputController control={control} name={"detailedAddress"} placeholder='Detailed Address' />
                </View>
            </View>

            <View style={styles.bottomButtonContainer}>
                <AppButton title='Confirm' style={{ marginBottom: vs(10) }} onPress={handleSubmit(saveOrder)} />
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
        paddingTop: vs(15)
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