import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function Home() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText style={styles.greeting}>Good morning,</ThemedText>
            <ThemedText style={styles.name}>Welcome back 👋</ThemedText>
          </View>
          <View style={[styles.avatar, { backgroundColor: theme.badgeBg, borderColor: theme.tint }]}>
            <Ionicons name="person" size={22} color={theme.tint} />
          </View>
        </View>

        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(33,208,178,0.15)' }]}>
          <ThemedText style={[styles.balanceLabel, { color: theme.subtitle }]}>TOTAL BALANCE</ThemedText>
          <ThemedText style={[styles.balanceAmount, { color: theme.statValue }]}>$24,830.00</ThemedText>
          <ThemedText style={[styles.balanceChange, { color: theme.tint }]}>↑ 2.4% this month</ThemedText>
        </View>

        {/* Quick Actions */}
        <ThemedText style={[styles.sectionTitle, { color: theme.subtitle }]}>QUICK ACTIONS</ThemedText>
        <View style={styles.actionsRow}>
          {[
            { icon: 'paper-plane-outline', label: 'Send' },
            { icon: 'arrow-down-circle-outline', label: 'Receive' },
            { icon: 'card-outline', label: 'Cards' },
            { icon: 'receipt-outline', label: 'History' },
          ].map((item) => (
            <View key={item.label} style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: theme.badgeBg }]}>
                <Ionicons name={item.icon as any} size={22} color={theme.tint} />
              </View>
              <ThemedText style={[styles.actionLabel, { color: theme.subtitle }]}>{item.label}</ThemedText>
            </View>
          ))}
        </View>

        {/* Recent Transactions */}
        <ThemedText style={[styles.sectionTitle, { color: theme.subtitle }]}>RECENT</ThemedText>
        {[
          { icon: 'storefront-outline', label: 'Grocery Store', amount: '-$42.50', date: 'Today' },
          { icon: 'arrow-down-circle-outline', label: 'Salary Deposit', amount: '+$3,200.00', date: 'Yesterday' },
          { icon: 'wifi-outline', label: 'Netflix', amount: '-$15.99', date: 'Mon' },
        ].map((tx) => (
          <View key={tx.label} style={[styles.txRow, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0' }]}>
            <View style={[styles.txIcon, { backgroundColor: theme.badgeBg }]}>
              <Ionicons name={tx.icon as any} size={20} color={theme.tint} />
            </View>
            <View style={styles.txInfo}>
              <ThemedText style={styles.txLabel}>{tx.label}</ThemedText>
              <ThemedText style={[styles.txDate, { color: theme.subtitle }]}>{tx.date}</ThemedText>
            </View>
            <ThemedText style={[styles.txAmount, { color: tx.amount.startsWith('+') ? theme.tint : theme.text }]}>{tx.amount}</ThemedText>
          </View>
        ))}

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 },
  greeting: { fontSize: 13, opacity: 0.5, fontFamily: Fonts.body, letterSpacing: 0.5 },
  name: { fontSize: 22, fontFamily: Fonts.heading, marginTop: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  balanceCard: { borderRadius: 20, padding: 24, borderWidth: 1, marginBottom: 28 },
  balanceLabel: { fontSize: 10, letterSpacing: 1.5, fontFamily: Fonts.heading, marginBottom: 8 },
  balanceAmount: { fontSize: 36, fontFamily: Fonts.heading, letterSpacing: -1 },
  balanceChange: { fontSize: 12, fontFamily: Fonts.body, marginTop: 6 },
  sectionTitle: { fontSize: 10, letterSpacing: 1.5, fontFamily: Fonts.heading, marginBottom: 14 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 },
  actionItem: { alignItems: 'center', gap: 8 },
  actionIcon: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: 11, fontFamily: Fonts.body },
  txRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1 },
  txIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  txInfo: { flex: 1 },
  txLabel: { fontSize: 14, fontFamily: Fonts.heading },
  txDate: { fontSize: 12, fontFamily: Fonts.body, marginTop: 2 },
  txAmount: { fontSize: 14, fontFamily: Fonts.heading },
});
