import { BlurView } from "expo-blur";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { SymbolView } from "expo-symbols";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

function NativeTabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "house", selected: "house.fill" }} />
        <Label>Inicio</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="nosotros">
        <Icon sf={{ default: "info.circle", selected: "info.circle.fill" }} />
        <Label>Nosotros</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="servicios">
        <Icon sf={{ default: "grid", selected: "grid.fill" }} />
        <Label>Servicios</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="destinos">
        <Icon sf={{ default: "map", selected: "map.fill" }} />
        <Label>Destinos</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="reserva">
        <Icon sf={{ default: "calendar", selected: "calendar.fill" }} />
        <Label>Reserva</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="contacto">
        <Icon sf={{ default: "phone", selected: "phone.fill" }} />
        <Label>Contacto</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";
  const insets = useSafeAreaInsets();

  const tabBarHeight = isWeb ? 84 : 50 + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Inter_600SemiBold",
          marginBottom: isWeb ? 0 : 2,
        },
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : colors.navBackground,
          borderTopWidth: 0,
          elevation: 0,
          height: tabBarHeight,
          paddingBottom: isWeb ? 10 : insets.bottom,
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView
              intensity={90}
              tint={isDark ? "dark" : "dark"}
              style={StyleSheet.absoluteFill}
            />
          ) : isWeb ? (
            <View
              style={[StyleSheet.absoluteFill, { backgroundColor: colors.navBackground }]}
            />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="house" tintColor={color} size={22} />
            ) : (
              <Feather name="home" size={21} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="nosotros"
        options={{
          title: "Nosotros",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="info.circle" tintColor={color} size={22} />
            ) : (
              <Feather name="info" size={21} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="servicios"
        options={{
          title: "Servicios",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="grid" tintColor={color} size={22} />
            ) : (
              <Feather name="grid" size={21} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="destinos"
        options={{
          title: "Destinos",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="map" tintColor={color} size={22} />
            ) : (
              <Feather name="map-pin" size={21} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="reserva"
        options={{
          title: "Reserva",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="calendar" tintColor={color} size={22} />
            ) : (
              <Feather name="calendar" size={21} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="contacto"
        options={{
          title: "Contacto",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="phone" tintColor={color} size={22} />
            ) : (
              <Feather name="phone" size={21} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
