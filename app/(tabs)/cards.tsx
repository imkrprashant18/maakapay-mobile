import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Cards() {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <ThemedText style={styles.pageTitle}>Cards</ThemedText>

        {/* Card Visual */}
        <View style={[styles.card, { backgroundColor: isDark ? '#0D2137' : theme.primary }]}>
          <View style={styles.cardTop}>
            <ThemedText style={styles.cardBank}>MAAKAPAY</ThemedText>
            <Ionicons name="wifi-outline" size={22} color="rgba(255,255,255,0.7)" style={{ transform: [{ rotate: '90deg' }] }} />
          </View>
          <ThemedText style={styles.cardNumber}>•••• •••• •••• 4821</ThemedText>
          <View style={styles.cardBottom}>
            <View>
              <ThemedText style={styles.cardMeta}>CARD HOLDER</ThemedText>
              <ThemedText style={styles.cardValue}>John Doe</ThemedText>
            </View>
            <View>
              <ThemedText style={styles.cardMeta}>EXPIRES</ThemedText>
              <ThemedText style={styles.cardValue}>08/27</ThemedText>
            </View>
            <ThemedText style={styles.cardNetwork}>VISA</ThemedText>
          </View>
        </View>

        {/* Card Actions */}
        <View style={styles.actionsRow}>
          {[
            { icon: 'lock-closed-outline', label: 'Freeze' },
            { icon: 'settings-outline', label: 'Manage' },
            { icon: 'add-circle-outline', label: 'Add Card' },
            { icon: 'eye-outline', label: 'Details' },
          ].map((a) => (
            <TouchableOpacity key={a.label} style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: theme.badgeBg }]}>
                <Ionicons name={a.icon as any} size={22} color={theme.tint} />
              </View>
              <ThemedText style={[styles.actionLabel, { color: theme.subtitle }]}>{a.label}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Card Stats */}
        <ThemedText style={[styles.sectionTitle, { color: theme.subtitle }]}>THIS MONTH</ThemedText>
        <View style={styles.statsRow}>
          {[
            { label: 'SPENT', value: '$1,240' },
            { label: 'LIMIT', value: '$5,000' },
            { label: 'CASHBACK', value: '$12.40' },
          ].map((s) => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#F0F0F0' }]}>
              <ThemedText style={[styles.statLabel, { color: theme.subtitle }]}>{s.label}</ThemedText>
              <ThemedText style={[styles.statValue, { color: theme.statValue }]}>{s.value}</ThemedText>
            </View>
          ))}
        </View>

      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  pageTitle: { fontSize: 28, fontFamily: Fonts.heading, marginBottom: 24 },
  card: { borderRadius: 20, padding: 24, marginBottom: 24, minHeight: 180 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 },
  cardBank: { color: '#FFFFFF', fontSize: 14, fontFamily: Fonts.heading, letterSpacing: 2 },
  cardNumber: { color: '#FFFFFF', fontSize: 18, fontFamily: Fonts.heading, letterSpacing: 3, marginBottom: 24 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardMeta: { color: 'rgba(255,255,255,0.5)', fontSize: 9, letterSpacing: 1, fontFamily: Fonts.heading },
  cardValue: { color: '#FFFFFF', fontSize: 13, fontFamily: Fonts.heading, marginTop: 2 },
  cardNetwork: { color: '#FFFFFF', fontSize: 18, fontFamily: Fonts.heading, fontStyle: 'italic' },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  actionItem: { alignItems: 'center', gap: 8 },
  actionIcon: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: 11, fontFamily: Fonts.body },
  sectionTitle: { fontSize: 10, letterSpacing: 1.5, fontFamily: Fonts.heading, marginBottom: 14 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, borderRadius: 14, padding: 14, borderWidth: 1 },
  statLabel: { fontSize: 9, letterSpacing: 1, fontFamily: Fonts.heading, marginBottom: 6 },
  statValue: { fontSize: 18, fontFamily: Fonts.heading },
});
