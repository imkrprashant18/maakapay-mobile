import { Colors, Fonts } from "@/constants/theme";
import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Button as PaperButton } from "react-native-paper";

type Variant = "primary" | "secondary" | "outline" | "danger" | "ghost" | "success" | "warning";

interface ButtonProps {
        variant?: Variant;
        onPress?: () => void;
        children: React.ReactNode;
        style?: ViewStyle;
        textStyle?: TextStyle;
        loading?: boolean;
        disabled?: boolean;
        fullWidth?: boolean;
        icon?: string;
}

const variantConfig: Record<Variant, { bg: string; text: string; mode: "contained" | "outlined" | "text"; borderColor?: string }> = {
        primary: { bg: Colors.teal, text: Colors.background, mode: "contained" },
        secondary: { bg: Colors.blue, text: Colors.background, mode: "contained" },
        danger: { bg: Colors.danger, text: Colors.dangerForeground, mode: "contained" },
        success: { bg: Colors.success, text: Colors.successForeground, mode: "contained" },
        warning: { bg: Colors.warning, text: Colors.warningForeground, mode: "contained" },
        outline: { bg: "transparent", text: Colors.teal, mode: "outlined", borderColor: Colors.teal },
        ghost: { bg: Colors.ghost, text: Colors.ghostForeground, mode: "text" },
};

const Button: React.FC<ButtonProps> = ({
        variant = "primary",
        onPress,
        children,
        style,
        textStyle,
        loading = false,
        disabled = false,
        fullWidth = false,
        icon,
}) => {
        const { bg, text, mode, borderColor } = variantConfig[variant];

        return (
                <PaperButton
                        mode={mode}
                        onPress={onPress}
                        loading={loading}
                        disabled={disabled}
                        icon={icon}
                        style={[
                                styles.button,
                                borderColor ? { borderColor, borderWidth: 1.5 } : undefined,
                                fullWidth && styles.fullWidth,
                                (disabled || loading) && styles.disabled,
                                style,
                        ]}
                        contentStyle={styles.content}
                        labelStyle={[styles.text, { color: text }, textStyle]}
                        buttonColor={bg}
                        textColor={text}
                        rippleColor="rgba(0,0,0,0.1)"
                >
                        {children}
                </PaperButton>
        );
};

const styles = StyleSheet.create({
        button: {
                borderRadius: 10,
        },
        fullWidth: {
                width: "100%",
        },
        content: {
                paddingVertical: 8,
        },
        text: {
                fontSize: 16,
                fontFamily: Fonts.heading,
        },
        disabled: {
                opacity: 0.6,
        },
});

export default Button;
