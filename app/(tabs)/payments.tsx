import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const CONTACTS = [
  { name: 'Alex M.', initials: 'AM' },
  { name: 'Sara K.', initials: 'SK' },
  { name: 'John D.', initials: 'JD' },
  { name: 'Priya R.', initials: 'PR' },
];

export default function Payments() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <ThemedText style={styles.pageTitle}>Payments</ThemedText>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          {[
            { icon: 'paper-plane', label: 'Send', lib: 'fa5' },
            { icon: 'arrow-down-circle-outline', label: 'Request', lib: 'ion' },
            { icon: 'swap-horizontal-outline', label: 'Transfer', lib: 'ion' },
            { icon: 'qr-code-outline', label: 'Scan', lib: 'ion' },
          ].map((a) => (
            <TouchableOpacity key={a.label} style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: theme.badgeBg }]}>
                {a.lib === 'fa5'
                  ? <FontAwesome5 name={a.icon} size={18} color={theme.tint} />
                  : <Ionicons name={a.icon as any} size={22} color={theme.tint} />}
              </View>
              <ThemedText style={[styles.actionLabel, { color: theme.subtitle }]}>{a.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Contacts */}
        <ThemedText style={[styles.sectionTitle, { color: theme.subtitle }]}>RECENT CONTACTS</ThemedText>
        <View style={styles.contactsRow}>
          {CONTACTS.map((c) => (
            <TouchableOpacity key={c.name} style={styles.contactItem}>
              <View style={[styles.contactAvatar, { backgroundColor: theme.badgeBg, borderColor: theme.tint }]}>
                <ThemedText style={[styles.contactInitials, { color: theme.tint }]}>{c.initials}</ThemedText>
              </View>
              <ThemedText style={[styles.contactName, { color: theme.subtitle }]}>{c.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Send Money Card */}
        <ThemedText style={[styles.sectionTitle, { color: theme.subtitle }]}>SEND MONEY</ThemedText>
        <View style={[styles.sendCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(33,208,178,0.15)' }]}>
          <ThemedText style={[styles.sendLabel, { color: theme.subtitle }]}>AMOUNT</ThemedText>
          <ThemedText style={[styles.sendAmount, { color: theme.statValue }]}>$0.00</ThemedText>
          <View style={[styles.sendDivider, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F0F0F0' }]} />
          <TouchableOpacity style={[styles.sendBtn, { backgroundColor: theme.primaryBtnBg }]}>
            <ThemedText style={[styles.sendBtnText, { color: theme.primaryBtnText }]}>SEND PAYMENT</ThemedText>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  pageTitle: { fontSize: 28, fontFamily: Fonts.heading, marginBottom: 24 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  actionItem: { alignItems: 'center', gap: 8 },
  actionIcon: { width: 56, height: 56, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: 11, fontFamily: Fonts.body },
  sectionTitle: { fontSize: 10, letterSpacing: 1.5, fontFamily: Fonts.heading, marginBottom: 14 },
  contactsRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  contactItem: { alignItems: 'center', gap: 8 },
  contactAvatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  contactInitials: { fontSize: 14, fontFamily: Fonts.heading },
  contactName: { fontSize: 11, fontFamily: Fonts.body },
  sendCard: { borderRadius: 20, padding: 24, borderWidth: 1 },
  sendLabel: { fontSize: 10, letterSpacing: 1.5, fontFamily: Fonts.heading, marginBottom: 8 },
  sendAmount: { fontSize: 40, fontFamily: Fonts.heading, letterSpacing: -1, marginBottom: 20 },
  sendDivider: { height: 1, marginBottom: 20 },
  sendBtn: { borderRadius: 12, height: 50, justifyContent: 'center', alignItems: 'center' },
  sendBtnText: { fontSize: 13, fontFamily: Fonts.heading, letterSpacing: 1 },
});
