import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
} from "react-native";
import { s, vs } from "react-native-size-matters";

import AppText from "../AppText";
import { AppColors } from "../../styles/colors";

interface AppButtonProps {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    style?: ViewStyle | ViewStyle[];
    styleTitle?: TextStyle | TextStyle[];
    disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
    onPress,
    title,
    backgroundColor = AppColors.primary,
    textColor = AppColors.white,
    style,
    styleTitle,
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
            style={[
                styles.button,

                {
                    backgroundColor: disabled
                        ? AppColors.disableGray
                        : backgroundColor,
                },
                style,
            ]}
        >
            <AppText
                variant="bold"
                style={[styles.textTitle, { color: textColor }, styleTitle]}
            >
                {title}
            </AppText>
        </TouchableOpacity>
    );
};

export default AppButton;

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: vs(40),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: s(25),
        alignSelf: "center",
    },
    textTitle: {
        fontSize: s(16),
    },
});
