import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Colors, Fonts } from "@/constants/theme";
import { LoginFormData, loginSchema } from "@/utils/validations-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Platform, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";

export default function LoginScreen() {
        const isDark = useColorScheme() === "dark";
        const router = useRouter();
        const [biometricType, setBiometricType] = useState<"fingerprint" | "face" | null>(null);

        useEffect(() => {
                if (Platform.OS === "web") return;
                (async () => {
                        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
                        if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
                                setBiometricType(Platform.OS === "ios" ? "face" : "fingerprint");
                        } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
                                setBiometricType("fingerprint");
                        }
                })();
        }, []);

        const { control, handleSubmit } = useForm<LoginFormData>({
                resolver: zodResolver(loginSchema),
                defaultValues: { email: "", password: "" },
        });

        const onLogin = (data: LoginFormData) => {
                console.log("Login Attempt:", data);
        };

        return (
                <ThemedView style={styles.container}>
                        <ScrollView contentContainerStyle={styles.scrollContent}>

                                <View style={styles.header}>
                                        <View style={styles.logoBox}>
                                                <Image
                                                        source={require("@/assets/images/icon.png")}
                                                        style={styles.logoImage}
                                                        contentFit="contain"
                                                />
                                        </View>
                                        <ThemedText style={styles.brandName}>Maakapay</ThemedText>
                                        <ThemedText style={styles.tagline}>EDITORIAL WEALTH MANAGEMENT</ThemedText>
                                </View>

                                {/* Card Container */}
                                <View style={[styles.card, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF' }]}>

                                        <View style={styles.inputWrapper}>
                                                <ThemedText style={styles.inputLabel}>EMAIL</ThemedText>
                                                <Input
                                                        name="email"
                                                        control={control}
                                                        label="name@maakapay.com"
                                                />
                                        </View>

                                        <View style={styles.inputWrapper}>
                                                <View style={styles.passwordHeader}>
                                                        <ThemedText style={styles.inputLabel}>PASSWORD</ThemedText>
                                                        <TouchableOpacity onPress={() => { }}>
                                                                <ThemedText style={styles.forgotText}>FORGOT?</ThemedText>
                                                        </TouchableOpacity>
                                                </View>
                                                <Input
                                                        name="password"
                                                        control={control}
                                                        label="••••••••"
                                                        type="password"
                                                />
                                        </View>

                                        <Button
                                                variant="primary"
                                                fullWidth
                                                style={styles.loginBtn}
                                                onPress={handleSubmit(onLogin)}
                                        >
                                                Login
                                        </Button>

                                        {biometricType && (
                                                <>
                                                        <View style={styles.separatorContainer}>
                                                                <View style={[styles.line, { backgroundColor: Colors.muted }]} />
                                                                <ThemedText style={styles.separatorText}>OR SECURE ACCESS</ThemedText>
                                                                <View style={[styles.line, { backgroundColor: Colors.muted }]} />
                                                        </View>

                                                        <View style={styles.row}>
                                                                <Button
                                                                        variant="ghost"
                                                                        style={styles.secureBtn}
                                                                        textStyle={styles.secureBtnText}
                                                                        icon={biometricType === "face" ? "face-recognition" : "fingerprint"}
                                                                >
                                                                        {biometricType === "face" ? "Face ID" : "Fingerprint"}
                                                                </Button>
                                                        </View>
                                                </>
                                        )}
                                </View>

                                {/* Bottom Navigation */}
                                <View style={styles.footer}>
                                        <ThemedText style={styles.footerText}>
                                                Don't have an account? <ThemedText type="link" style={styles.linkText} onPress={() => { router.push("/home") }}>Create yours</ThemedText>
                                        </ThemedText>

                                        <View style={styles.legalRow}>
                                                <ThemedText style={styles.legalText}>SECURED BY VAULTGUARD™</ThemedText>
                                                <View style={styles.legalSubRow}>
                                                        <ThemedText style={styles.legalText}>PRIVACY</ThemedText>
                                                        <ThemedText style={styles.legalText}>TERMS</ThemedText>
                                                </View>
                                        </View>
                                </View>

                        </ScrollView>
                </ThemedView>
        );
}

const styles = StyleSheet.create({
        container: { flex: 1 },
        scrollContent: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
        header: { alignItems: "center", marginBottom: 40 },
        logoBox: { width: 80, height: 80, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 16, elevation: 5, shadowOpacity: 0.1 },
        logoImage: { width: "100%", height: "100%" },
        brandName: { fontSize: 36, fontFamily: Fonts.heading, letterSpacing: -1 },
        tagline: { fontSize: 12, opacity: 0.5, letterSpacing: 1.5, marginTop: 4, fontFamily: Fonts.body },

        card: { borderRadius: 28, padding: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
        inputWrapper: { marginBottom: 4 },
        passwordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: -4, zIndex: 1 },
        inputLabel: { fontSize: 10, letterSpacing: 1, opacity: 0.6, marginBottom: 8, fontFamily: Fonts.heading },
        forgotText: { fontSize: 10, color: Colors.blue, fontFamily: Fonts.heading, letterSpacing: 0.5 },

        loginBtn: { marginTop: 16 },

        separatorContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
        line: { flex: 1, height: 1, opacity: 0.1 },
        separatorText: { fontSize: 10, marginHorizontal: 10, opacity: 0.4, letterSpacing: 1 },

        row: { flexDirection: 'row', gap: 12 },
        secureBtn: { flex: 1, backgroundColor: Colors.success, borderRadius: 12, height: 50 },
        secureBtnText: { fontSize: 12, fontFamily: Fonts.body },

        footer: { marginTop: 40, alignItems: 'center' },
        footerText: { fontSize: 14, opacity: 0.8 },
        linkText: { fontWeight: '700' },

        legalRow: { width: '100%', marginTop: 50, flexDirection: 'row', justifyContent: 'space-between', opacity: 0.3 },
        legalSubRow: { flexDirection: 'row', gap: 20 },
        legalText: { fontSize: 10, letterSpacing: 1, fontFamily: Fonts.heading }
});