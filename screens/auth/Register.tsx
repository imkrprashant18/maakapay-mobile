import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";



import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { SignUpFormData, signUpSchema } from "@/utils/validations-schema";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useColorScheme } from "react-native";

export default function SignUpScreen() {
        const colorScheme = useColorScheme() ?? "light";
        const isDark = colorScheme === "dark";
        const router = useRouter();
        const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
                resolver: zodResolver(signUpSchema),
                defaultValues: {
                        fullName: "",
                        email: "",
                        phone: "",
                        password: "",
                },
        });

        const onSubmit = (data: SignUpFormData) => {
                console.log("Form Data:", data);
        };

        return (
                <ThemedView style={styles.container}>
                        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                                {/* Header / Logo Section */}
                                <View style={styles.header}>
                                        <View style={[styles.logoPlaceholder, { backgroundColor: isDark ? '#1A2E42' : '#E8F4F8' }]}>
                                                <Image
                                                        source={require("@/assets/images/icon.png")}
                                                        style={styles.logoImage}
                                                        contentFit="contain"
                                                />
                                        </View>
                                        <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
                                        <ThemedText style={styles.subtitle}>
                                                Join the elite ecosystem for high-stakes financial curation.
                                        </ThemedText>
                                </View>

                                {/* Form Section */}
                                <View style={[styles.formCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF' }]}>
                                        <Input
                                                name="fullName"
                                                control={control}
                                                label="FULL NAME"
                                                type="text"
                                        />
                                        <Input
                                                name="email"
                                                control={control}
                                                label="EMAIL ADDRESS"
                                                type="email"
                                        />
                                        <Input
                                                name="phone"
                                                control={control}
                                                label="PHONE NUMBER"
                                                type="phone"
                                        />
                                        <Input
                                                name="password"
                                                control={control}
                                                label="PASSWORD"
                                                type="password"
                                        />

                                        <Button
                                                variant="primary"
                                                fullWidth
                                                style={styles.registerBtn}
                                                onPress={handleSubmit(onSubmit)}
                                        >
                                                Register
                                        </Button>




                                </View>

                                {/* Footer */}
                                <View style={styles.footer}>
                                        <ThemedText>
                                                Already part of the network?{" "}
                                                <ThemedText type="link" onPress={() => router.push("/VerifyOtp")}>Log in</ThemedText>
                                        </ThemedText>

                                        <View style={styles.encryptionBadge}>
                                                <ThemedText style={styles.encryptionText}>
                                                        ✓ BANK-GRADE 256-BIT ENCRYPTION ACTIVE
                                                </ThemedText>
                                        </View>
                                </View>

                        </ScrollView>
                </ThemedView>
        );
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        scrollContent: {
                paddingHorizontal: 24,
                paddingTop: 60,
                paddingBottom: 40,
        },
        logoImage: { width: "100%", height: "100%" },
        header: {
                alignItems: "center",
                marginBottom: 32,
        },
        logoPlaceholder: {
                width: 60,
                height: 60,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                borderWidth: 1,
                borderColor: 'rgba(33,208,178,0.3)',
        },
        title: {
                textAlign: "center",
                marginBottom: 8,
        },
        subtitle: {
                textAlign: "center",
                opacity: 0.7,
                paddingHorizontal: 20,
        },
        formCard: {
                borderRadius: 24,
                padding: 20,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.05)',
        },
        registerBtn: {
                marginTop: 10,
        },


        footer: {
                marginTop: 30,
                alignItems: "center",
        },
        encryptionBadge: {
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
        },
        encryptionText: {
                fontSize: 10,
                opacity: 0.5,
                letterSpacing: 0.5,
        }
});