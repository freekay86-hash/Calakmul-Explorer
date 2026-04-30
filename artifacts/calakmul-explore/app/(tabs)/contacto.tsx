import React from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import ContactoSection from "@/components/ContactoSection";

export default function ContactoScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const tabBarH = Platform.OS === "web" ? 84 : 50 + insets.bottom;

  return (
    <View style={[styles.root, { backgroundColor: colors.navBackground }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: tabBarH + 10 }}
        showsVerticalScrollIndicator={false}
      >
        <ContactoSection />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
});
