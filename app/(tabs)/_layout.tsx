import { Colors, Fonts } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';


export default function TabsLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopWidth: 1.5,
          // borderTopColor: theme.tint,
          elevation: 0,
          height: 85,
          paddingBottom: 20,
          paddingTop: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.heading,
          fontSize: 12,
          fontWeight: '600',
          textTransform: 'uppercase',
          marginTop: 4,
        },
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon focused={focused}>
              <Ionicons name="home" size={22} color={color} />
            </CustomTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'ACTIVITY',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon focused={focused}>
              <Ionicons name="receipt" size={22} color={color} />
            </CustomTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: 'PAYMENTS',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon focused={focused}>
              <FontAwesome5 name="paper-plane" size={20} color={color} />
            </CustomTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'CARDS',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon focused={focused}>
              <Ionicons name="card" size={22} color={color} />
            </CustomTabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon focused={focused}>
              <Ionicons name="person" size={22} color={color} />
            </CustomTabIcon>
          ),
        }}
      />
    </Tabs>
  );
}

// Helper component for the active background pill
function CustomTabIcon({ focused, children }: { focused: boolean; children: React.ReactNode }) {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={[styles.iconContainer, focused && { backgroundColor: "transparent" }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 44,
    height: 28,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});