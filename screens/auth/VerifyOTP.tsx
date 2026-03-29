import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { Colors, Fonts } from "@/constants/theme";
import { VerifyFormData, verifySchema } from "@/utils/validations-schema";
import { Image } from "expo-image";
import { useColorScheme } from "react-native";

export default function VerifyScreen() {
        const isDark = useColorScheme() === "dark";
        const inputRef = useRef<TextInput>(null);

        const { control, handleSubmit } = useForm<VerifyFormData>({
                resolver: zodResolver(verifySchema),
                defaultValues: { otp: "" },
        });

        const onSubmit = (data: VerifyFormData) => {
                console.log("Verified with OTP:", data.otp);
        };

        return (
                <ThemedView style={styles.container}>
                        {/* Header Navigation */}
                        <View style={styles.navBar}>
                                <View style={styles.brandRow}>
                                        <View style={styles.miniLogo}>
                                                <Image
                                                        source={require("@/assets/images/icon.png")}
                                                        style={styles.logoImage}
                                                        contentFit="contain"
                                                />
                                        </View>
                                        <ThemedText style={styles.brandName}>Maakapay</ThemedText>
                                </View>
                                <ThemedText style={styles.helpText}>Help</ThemedText>
                        </View>

                        <View style={styles.content}>
                                <View style={[styles.iconContainer, { backgroundColor: isDark ? 'rgba(33,208,178,0.1)' : '#E8F4F8' }]}>
                                        <ThemedText style={{ fontSize: 32 }}>🔒</ThemedText>
                                </View>

                                <ThemedText type="title" style={styles.title}>Verify Your Identity</ThemedText>
                                <ThemedText style={styles.description}>
                                        We've sent a 6-digit code to your email and phone number. Please enter it below to secure your account.
                                </ThemedText>

                                {/* OTP Input Card */}
                                <View style={[styles.otpCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF' }]}>

                                        <Controller
                                                control={control}
                                                name="otp"
                                                render={({ field: { onChange, value } }) => (
                                                        <View>
                                                                {/* Hidden Real Input */}
                                                                <TextInput
                                                                        ref={inputRef}
                                                                        value={value}
                                                                        onChangeText={(val) => val.length <= 6 && onChange(val)}
                                                                        keyboardType="number-pad"
                                                                        style={styles.hiddenInput}
                                                                        autoFocus
                                                                />

                                                                {/* Visual Boxes */}
                                                                <Pressable style={styles.otpRow} onPress={() => inputRef.current?.focus()}>
                                                                        {[...Array(6)].map((_, i) => (
                                                                                <View
                                                                                        key={i}
                                                                                        style={[
                                                                                                styles.otpBox,
                                                                                                { backgroundColor: isDark ? '#1A2E42' : '#F3F4F6' },
                                                                                                value.length === i && { borderColor: Colors.teal, borderWidth: 2 }
                                                                                        ]}
                                                                                >
                                                                                        <ThemedText style={styles.otpChar}>{value[i] || ""}</ThemedText>
                                                                                </View>
                                                                        ))}
                                                                </Pressable>
                                                        </View>
                                                )}
                                        />

                                        <Button variant="primary" fullWidth style={styles.verifyBtn} onPress={handleSubmit(onSubmit)}>
                                                Verify Now
                                        </Button>

                                        <View style={styles.resendContainer}>
                                                <ThemedText style={styles.resendLabel}>Didn't receive the code?</ThemedText>
                                                <ThemedText type="link" style={styles.resendLink}>Resend code in 0:45</ThemedText>
                                        </View>
                                </View>

                                {/* Encrypted Footer */}
                                <View style={[styles.infoBar, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F9FF' }]}>
                                        <View style={styles.infoIcon}><ThemedText style={{ fontSize: 12, color: Colors.teal }}>🛡</ThemedText></View>
                                        <View>
                                                <ThemedText style={styles.infoTitle}>Encrypted Connection</ThemedText>
                                                <ThemedText style={styles.infoSub}>Your verification data is protected by military-grade encryption.</ThemedText>
                                        </View>
                                </View>
                        </View>
                </ThemedView>
        );
}

const styles = StyleSheet.create({
        container: { flex: 1, paddingHorizontal: 20 },
        navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50 },
        brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
        miniLogo: { width: 32, height: 32, borderRadius: 8, backgroundColor: Colors.teal, justifyContent: 'center', alignItems: 'center' },
        miniLogoText: { color: '#FFF', fontWeight: 'bold' },
        brandName: { fontFamily: Fonts.heading, fontSize: 18, color: Colors.blue },
        helpText: { opacity: 0.6, fontSize: 14 },
        logoImage: { width: "100%", height: "100%" },

        content: { flex: 1, alignItems: 'center', paddingTop: 40 },
        iconContainer: { width: 80, height: 80, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
        title: { textAlign: 'center', marginBottom: 12 },
        description: { textAlign: 'center', opacity: 0.7, paddingHorizontal: 10, lineHeight: 22, marginBottom: 40 },

        otpCard: { width: '100%', borderRadius: 24, padding: 20, alignItems: 'center' },
        hiddenInput: { position: 'absolute', width: 0, height: 0, opacity: 0 },
        otpRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 30 },
        otpBox: { width: 45, height: 55, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
        otpChar: { fontSize: 24, fontFamily: Fonts.heading },

        verifyBtn: { width: '100%' },
        resendContainer: { marginTop: 20, alignItems: 'center' },
        resendLabel: { fontSize: 13, opacity: 0.6 },
        resendLink: { fontSize: 14, marginTop: 8 },

        infoBar: { width: '100%', flexDirection: 'row', padding: 16, borderRadius: 16, marginTop: 40, gap: 12 },
        infoIcon: { width: 30, height: 30, borderRadius: 8, backgroundColor: 'rgba(33,208,178,0.1)', justifyContent: 'center', alignItems: 'center' },
        infoTitle: { fontFamily: Fonts.heading, fontSize: 14 },
        infoSub: { fontSize: 11, opacity: 0.6, marginTop: 2 }
});