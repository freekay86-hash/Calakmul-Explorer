import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColors } from "@/hooks/useColors";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionTitle({ title, subtitle, light = false }: SectionTitleProps) {
  const colors = useColors();
  return (
    <View style={styles.container}>
      <View style={[styles.accent, { backgroundColor: light ? "rgba(255,255,255,0.5)" : colors.primary }]} />
      <Text style={[styles.title, { color: light ? "#ffffff" : colors.foreground }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: light ? "rgba(255,255,255,0.75)" : colors.mutedForeground }]}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingLeft: 4,
  },
  accent: {
    width: 44,
    height: 4,
    borderRadius: 2,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
});
