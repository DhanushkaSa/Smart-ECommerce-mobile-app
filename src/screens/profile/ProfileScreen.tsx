import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSafeView from '../../components/views/AppSafeView'
import HomeHeader from '../../components/headers/HomeHeader'
import ProfileSectionButton from '../../components/buttons/ProfileSectionButton'
import { sharedPaddingHorizontal } from '../../styles/sharedStyle'
import AppText from '../../components/AppText'
import { s, vs } from 'react-native-size-matters'
import MyOrderScreen from '../cart/MyOrderScreen'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
    const navigate=useNavigation()

    return (
        <AppSafeView>

            <HomeHeader />
            <AppText variant='bold' style={{ fontSize: s(18), marginTop: vs(10) }}>Hello, Dhanushka</AppText>
            <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
                <ProfileSectionButton title="My Orders" onPress={() => { navigate.navigate("MyOrderScreen")}} />
                <ProfileSectionButton title="Language" onPress={() => { }} />
                <ProfileSectionButton title="Logout" onPress={() => { }} />
            </View>

        </AppSafeView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})