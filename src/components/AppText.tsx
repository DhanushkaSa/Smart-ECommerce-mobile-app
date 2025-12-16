import { StyleSheet, Text, TextProps, TextStyle, View } from "react-native";
import React from "react";
import { s } from "react-native-size-matters";
import { AppColors } from "../styles/colors";
import { AppFonts } from "../styles/fonts";

interface AppTextProps extends TextProps {
    children: React.ReactNode;
    style?: TextStyle | TextStyle[];
    variant?: "bold" | "medium";
}

const AppText = ({
    children,
    style,
    variant = "medium",
    ...rest
}: AppTextProps) => {
    return (
        <Text {...rest} style={[styles[variant], style]}>
            {children}
        </Text>
    );
};

export default AppText;

const styles = StyleSheet.create({
    bold: {
        fontSize: s(18),
        color: AppColors.black,
        fontFamily:AppFonts.Bold
    },
    medium: {
        fontSize: s(16),
        color: AppColors.black,
        fontFamily:AppFonts.Medium
    },
});
