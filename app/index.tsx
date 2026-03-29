import { ThemedText } from "@/components/themed-text";
import { Colors, Fonts } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GetStarted = () => {
  const scheme = useColorScheme() ?? "dark";
  const t = Colors[scheme];
  const router = useRouter();

  return (
    <LinearGradient
      colors={[t.gradientStart, t.gradientMid, t.gradientEnd]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Image
                source={require("@/assets/images/icon.png")}
                style={styles.logoImage}
                contentFit="contain"
              />
            </View>
            <ThemedText style={[styles.logoText, { color: t.logoText }]}>
              Maakapay
            </ThemedText>
          </View>
          <ThemedText style={[styles.helpText, { color: t.helpText }]}>
            Help
          </ThemedText>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={[styles.badge, { backgroundColor: t.badgeBg }]}>
            <ThemedText style={[styles.badgeText, { color: t.badgeText }]}>
              NEW ERA OF FINANCE
            </ThemedText>
          </View>

          <View style={{ marginTop: 20 }}>
            <ThemedText style={[styles.title, { color: t.title }]}>
              Your Smart{"\n"}
              <ThemedText style={[styles.title, { color: t.highlight }]}>
                Financial
              </ThemedText>
              {"\n"}Companion.
            </ThemedText>
          </View>

          <ThemedText style={[styles.subtitle, { color: t.subtitle }]}>
            Manage your money, send payments, and track your spending all in one place.
          </ThemedText>

          <View style={{ marginTop: 30 }}>
            <TouchableOpacity
              style={[styles.primaryBtn, { backgroundColor: t.primaryBtnBg }]}
              onPress={() => router.push("/SignUp")}
            >
              <ThemedText style={[styles.primaryText, { color: t.primaryBtnText }]}>
                Get Started →
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.secondaryBtn,
                {
                  borderColor: t.secondaryBtnBorder,
                  backgroundColor: t.secondaryBtnBg,
                },
              ]}
              onPress={() => router.push("/Login")}
            >
              <ThemedText style={[styles.secondaryText, { color: t.secondaryBtnText }]}>
                Login
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Stats */}
        <View style={styles.footer}>
          {[
            { value: "4.9/5", label: "USER RATING" },
            { value: "2M+", label: "ACTIVE USERS" },
            { value: "0%", label: "HIDDEN FEES" },
          ].map((stat) => (
            <View key={stat.label} style={styles.stat}>
              <ThemedText style={[styles.statValue, { color: t.statValue }]}>
                {stat.value}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: t.statLabel }]}>
                {stat.label}
              </ThemedText>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  logoImage: { width: "100%", height: "100%" },
  logoText: { fontFamily: Fonts.logo, fontSize: 18 },
  helpText: { fontFamily: Fonts.body },
  content: { marginTop: 40 },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: { fontSize: 12, letterSpacing: 1, fontFamily: Fonts.heading },
  title: { fontSize: 34, lineHeight: 42, fontFamily: Fonts.heading },
  subtitle: { marginTop: 16, fontSize: 15, lineHeight: 24, fontFamily: Fonts.body },
  primaryBtn: { paddingVertical: 14, borderRadius: 14, alignItems: "center" },
  primaryText: { fontFamily: Fonts.heading, fontSize: 16 },
  secondaryBtn: {
    marginTop: 12,
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryText: { fontFamily: Fonts.body, fontSize: 15 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  stat: { alignItems: "center" },
  statValue: { fontSize: 18, fontFamily: Fonts.heading },
  statLabel: { fontSize: 11, marginTop: 4, fontFamily: Fonts.body },
});
