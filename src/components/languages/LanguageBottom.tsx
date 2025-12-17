import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActionSheet from "react-native-actions-sheet"
import AppText from '../AppText'
import AppButton from '../buttons/AppButton'
const LanguageBottom = () => {
    return (
        <ActionSheet id='LANG_SHEET'>
            <AppText>Change Language</AppText>

            <AppButton title='Confirm' onPress={() => { }} />
        </ActionSheet>
    )
}

export default LanguageBottom

const styles = StyleSheet.create({})