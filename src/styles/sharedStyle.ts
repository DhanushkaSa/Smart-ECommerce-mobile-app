import { StyleSheet } from "react-native";
import { s } from "react-native-size-matters";
import { AppColors } from "./colors";

export const sharedPaddingHorizontal = s(12);
export const commonStyles = StyleSheet.create({
  shadow: {
    shadowColor: AppColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 4,
  },
});
