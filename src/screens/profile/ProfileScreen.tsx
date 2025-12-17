import { Modal, StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import AppSafeView from '../../components/views/AppSafeView'
import HomeHeader from '../../components/headers/HomeHeader'
import ProfileSectionButton from '../../components/buttons/ProfileSectionButton'
import { sharedPaddingHorizontal } from '../../styles/sharedStyle'
import { s, vs } from 'react-native-size-matters'
import { AppFonts } from '../../styles/fonts'
import { useNavigation } from '@react-navigation/native'
import RadioWithTitle from '../../components/inputs/RadioWithTitle'
import { useTranslation } from 'react-i18next'
import { languageListArr } from '../../localization/languagesList'
import i18n from '../../localization/i18n'
import AppButton from '../../components/buttons/AppButton'

const ProfileScreen = () => {
    const navigate = useNavigation<any>()
    const [visible, setVisible] = useState(false)
    const { t } = useTranslation()
    const [selectedLang, setSelectedLang] = useState(i18n.language)

    const onLanguagePress = (code: string) => {
        setSelectedLang(code)
    }

    const handleConfirm=()=>{
        setVisible(false)
        i18n.changeLanguage(selectedLang)
    }

    return (
        <AppSafeView>
            <HomeHeader />

            <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
                <ProfileSectionButton
                    title={t('profile_my_orders')}
                    onPress={() => navigate.navigate('MyOrderScreen')}
                />
                <ProfileSectionButton
                    title={t('profile_language')}
                    onPress={() => setVisible(true)}
                />
                <ProfileSectionButton
                    title={t('profile_logout')}
                    onPress={() => { }}
                />
            </View>

            <Modal visible={visible} animationType="slide">
                <View>
                    <Text
                        style={styles.languageTitle}
                        onPress={() => setVisible(false)}
                    >
                        {t('profile_change_language')}
                    </Text>



                    {
                        languageListArr.map((lang) => (
                            <RadioWithTitle key={lang.code} title={lang.label} selected={selectedLang === lang.code} onPress={() => onLanguagePress(lang.code)} />
                        ))
                    }

                    <AppButton style={styles.confirm} title={t('confirm')} onPress={handleConfirm} />
                </View>
            </Modal>
        </AppSafeView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    languageTitle: {
        textAlign: 'center',
        marginTop: vs(25),
        fontSize: s(20),
        fontFamily: AppFonts.Bold,
    },
    confirm: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: vs(20),
        width: "90%"

    }
})
