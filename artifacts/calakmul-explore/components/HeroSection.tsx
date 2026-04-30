import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
const IS_WEB = Platform.OS === "web";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

const { width: W, height: H } = Dimensions.get("window");

interface HeroSectionProps {
  onExplorePress: () => void;
}

export default function HeroSection({ onExplorePress }: HeroSectionProps) {
  const colors = useColors();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(1.05)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: !IS_WEB,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: !IS_WEB,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: !IS_WEB,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ scale: scaleAnim }] }]}>
        <Image
          source={require("@/assets/images/hero_calakmul.png")}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
      </Animated.View>

      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.heroOverlay }]} />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.badge}>
          <Feather name="map-pin" size={12} color="#ffffff" />
          <Text style={styles.badgeText}>Campeche, México</Text>
        </View>

        <Text style={styles.title}>Descubre{"\n"}Calakmul</Text>
        <Text style={styles.subtitle}>
          La gran ciudad de la serpiente con dos cabezas. Patrimonio de la Humanidad.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2,500+</Text>
            <Text style={styles.statLabel}>Años de historia</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7,000</Text>
            <Text style={styles.statLabel}>Km² de selva</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>250+</Text>
            <Text style={styles.statLabel}>Especies de aves</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.exploreBtn, { backgroundColor: colors.primary }]}
          onPress={onExplorePress}
          activeOpacity={0.85}
        >
          <Text style={styles.exploreBtnText}>Explorar Destinos</Text>
          <Feather name="arrow-right" size={18} color="#ffffff" />
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.scrollIndicator}>
        <Feather name="chevrons-down" size={24} color="rgba(255,255,255,0.6)" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: W,
    height: H * 0.72,
    justifyContent: "flex-end",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    gap: 6,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    letterSpacing: 0.5,
  },
  title: {
    color: "#ffffff",
    fontSize: 52,
    fontFamily: "Inter_700Bold",
    lineHeight: 58,
    marginBottom: 14,
  },
  subtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    marginBottom: 28,
    maxWidth: "85%",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 28,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
  },
  statLabel: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  exploreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 14,
    gap: 10,
    shadowColor: "#1a6b3c",
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  exploreBtnText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    letterSpacing: 0.5,
  },
  scrollIndicator: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
  },
});
