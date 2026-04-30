import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

interface MiniHeaderProps {
  title: string;
}

export default function MiniHeader({ title }: MiniHeaderProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.navBackground,
          paddingTop: topPad + 10,
        },
      ]}
    >
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        contentFit="contain"
      />
      <View style={styles.titles}>
        <Text style={styles.appName}>Calakmul Explore</Text>
        <Text style={styles.section}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    zIndex: 50,
    elevation: 8,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  titles: {
    flex: 1,
  },
  appName: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  section: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.2,
  },
});
