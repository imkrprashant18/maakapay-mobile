import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const MENU_ITEMS = [
  { icon: 'person-outline', label: 'Personal Info' },
  { icon: 'shield-checkmark-outline', label: 'Security' },
  { icon: 'notifications-outline', label: 'Notifications' },
  { icon: 'card-outline', label: 'Payment Methods' },
  { icon: 'help-circle-outline', label: 'Help & Support' },
  { icon: 'document-text-outline', label: 'Terms & Privacy' },
];

export default function Profile() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Avatar & Name */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatar, { backgroundColor: theme.badgeBg, borderColor: theme.tint }]}>
            <Ionicons name="person" size={36} color={theme.tint} />
          </View>
          <ThemedText style={styles.name}>John Doe</ThemedText>
          <ThemedText style={[styles.email, { color: theme.subtitle }]}>john@maakapay.com</ThemedText>
          <View style={[styles.badge, { backgroundColor: theme.badgeBg }]}>
            <ThemedText style={[styles.badgeText, { color: theme.tint }]}>PREMIUM MEMBER</ThemedText>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'TRANSACTIONS', value: '248' },
            { label: 'SAVED', value: '$4.2K' },
            { label: 'CASHBACK', value: '$86' },
          ].map((s) => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#F0F0F0' }]}>
              <ThemedText style={[styles.statValue, { color: theme.statValue }]}>{s.value}</ThemedText>
              <ThemedText style={[styles.statLabel, { color: theme.subtitle }]}>{s.label}</ThemedText>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={[styles.menuCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0' }]}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuRow, i < MENU_ITEMS.length - 1 && { borderBottomWidth: 1, borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : '#F5F5F5' }]}
            >
              <View style={[styles.menuIcon, { backgroundColor: theme.badgeBg }]}>
                <Ionicons name={item.icon as any} size={18} color={theme.tint} />
              </View>
              <ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
              <Ionicons name="chevron-forward" size={16} color={theme.subtitle} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={[styles.logoutBtn, { borderColor: Colors.danger }]}>
          <Ionicons name="log-out-outline" size={18} color={Colors.danger} />
          <ThemedText style={[styles.logoutText, { color: Colors.danger }]}>LOG OUT</ThemedText>
        </TouchableOpacity>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  profileHeader: { alignItems: 'center', marginBottom: 28 },
  avatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  name: { fontSize: 22, fontFamily: Fonts.heading },
  email: { fontSize: 13, fontFamily: Fonts.body, marginTop: 4 },
  badge: { marginTop: 10, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 10, fontFamily: Fonts.heading, letterSpacing: 1 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: { flex: 1, borderRadius: 14, padding: 14, borderWidth: 1, alignItems: 'center' },
  statValue: { fontSize: 18, fontFamily: Fonts.heading },
  statLabel: { fontSize: 9, letterSpacing: 1, fontFamily: Fonts.heading, marginTop: 4 },
  menuCard: { borderRadius: 20, borderWidth: 1, overflow: 'hidden', marginBottom: 20 },
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  menuIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { flex: 1, fontSize: 14, fontFamily: Fonts.body },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderRadius: 14, height: 50 },
  logoutText: { fontSize: 13, fontFamily: Fonts.heading, letterSpacing: 1 },
});
