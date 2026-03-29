import { Colors, Fonts } from "@/constants/theme";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useColorScheme } from "react-native";
import { StyleSheet, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

type InputType = "text" | "email" | "password" | "phone";

interface InputProps {
  name: string;
  control: any;
  label: string;
  type?: InputType;
  rules?: any;
  defaultValue?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  control,
  label,
  type = "text",
  rules,
  defaultValue = "",
}) => {
  const scheme = useColorScheme() ?? "light";
  const t = Colors[scheme];

  const [secureText, setSecureText] = useState(type === "password");

  const keyboardType =
    type === "email" ? "email-address" : type === "phone" ? "phone-pad" : "default";

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TextInput
            label={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            mode="outlined"
            keyboardType={keyboardType}
            secureTextEntry={secureText}
            autoCapitalize={type === "email" ? "none" : "sentences"}
            style={[styles.input, { backgroundColor: t.inputBg }]}
            outlineStyle={styles.outline}
            textColor={t.inputText}
            activeOutlineColor={t.inputActiveBorder}
            outlineColor={error ? Colors.danger : t.inputBorder}
            theme={{
              colors: {
                onSurfaceVariant: t.inputLabel,
              },
            }}
            right={
              type === "password" ? (
                <TextInput.Icon
                  icon={secureText ? "eye-off" : "eye"}
                  color={t.inputLabel}
                  onPress={() => setSecureText(!secureText)}
                />
              ) : null
            }
          />
          <HelperText type="error" visible={!!error}>
            {error?.message}
          </HelperText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  input: {
    fontFamily: Fonts.body,
  },
  outline: {
    borderRadius: 10,
  },
});

export default Input;
