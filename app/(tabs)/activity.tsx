import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const TRANSACTIONS = [
  { icon: 'storefront-outline', label: 'Grocery Store', category: 'SHOPPING', amount: '-$42.50', date: 'Today, 10:24 AM' },
  { icon: 'arrow-down-circle-outline', label: 'Salary Deposit', category: 'INCOME', amount: '+$3,200.00', date: 'Yesterday, 9:00 AM' },
  { icon: 'wifi-outline', label: 'Netflix', category: 'SUBSCRIPTIONS', amount: '-$15.99', date: 'Mon, 8:00 PM' },
  { icon: 'car-outline', label: 'Uber', category: 'TRANSPORT', amount: '-$12.00', date: 'Sun, 6:45 PM' },
  { icon: 'restaurant-outline', label: 'Dinner Out', category: 'FOOD', amount: '-$68.00', date: 'Sat, 7:30 PM' },
  { icon: 'arrow-down-circle-outline', label: 'Freelance Pay', category: 'INCOME', amount: '+$850.00', date: 'Fri, 2:00 PM' },
];

export default function Activity() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <ThemedText style={styles.pageTitle}>Activity</ThemedText>

        {/* Summary Row */}
        <View style={styles.summaryRow}>
          {[
            { label: 'INCOME', value: '+$4,050', color: theme.tint },
            { label: 'SPENT', value: '-$138', color: theme.statLabel },
          ].map((s) => (
            <View key={s.label} style={[styles.summaryCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#F0F0F0' }]}>
              <ThemedText style={[styles.summaryLabel, { color: theme.subtitle }]}>{s.label}</ThemedText>
              <ThemedText style={[styles.summaryValue, { color: s.color }]}>{s.value}</ThemedText>
            </View>
          ))}
        </View>

        <ThemedText style={[styles.sectionTitle, { color: theme.subtitle }]}>ALL TRANSACTIONS</ThemedText>

        {TRANSACTIONS.map((tx) => (
          <View key={tx.label + tx.date} style={[styles.txRow, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0' }]}>
            <View style={[styles.txIcon, { backgroundColor: theme.badgeBg }]}>
              <Ionicons name={tx.icon as any} size={20} color={theme.tint} />
            </View>
            <View style={styles.txInfo}>
              <ThemedText style={styles.txLabel}>{tx.label}</ThemedText>
              <ThemedText style={[styles.txCategory, { color: theme.subtitle }]}>{tx.category}</ThemedText>
            </View>
            <View style={styles.txRight}>
              <ThemedText style={[styles.txAmount, { color: tx.amount.startsWith('+') ? theme.tint : theme.text }]}>{tx.amount}</ThemedText>
              <ThemedText style={[styles.txDate, { color: theme.subtitle }]}>{tx.date}</ThemedText>
            </View>
          </View>
        ))}

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  pageTitle: { fontSize: 28, fontFamily: Fonts.heading, marginBottom: 24 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  summaryCard: { flex: 1, borderRadius: 16, padding: 16, borderWidth: 1 },
  summaryLabel: { fontSize: 10, letterSpacing: 1.5, fontFamily: Fonts.heading, marginBottom: 6 },
  summaryValue: { fontSize: 22, fontFamily: Fonts.heading },
  sectionTitle: { fontSize: 10, letterSpacing: 1.5, fontFamily: Fonts.heading, marginBottom: 14 },
  txRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1 },
  txIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  txInfo: { flex: 1 },
  txLabel: { fontSize: 14, fontFamily: Fonts.heading },
  txCategory: { fontSize: 11, fontFamily: Fonts.body, marginTop: 2, letterSpacing: 0.5 },
  txRight: { alignItems: 'flex-end' },
  txAmount: { fontSize: 14, fontFamily: Fonts.heading },
  txDate: { fontSize: 11, fontFamily: Fonts.body, marginTop: 2 },
});
