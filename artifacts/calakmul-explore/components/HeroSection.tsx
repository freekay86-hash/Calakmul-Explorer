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
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

const IS_WEB = Platform.OS === "web";
const { width: W, height: H } = Dimensions.get("window");

interface HeroSectionProps {
  onExplorePress: () => void;
}

export default function HeroSection({ onExplorePress }: HeroSectionProps) {
  const colors = useColors();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

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
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/pyramid_front.jpeg")}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />

      <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.heroOverlay }]} />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.badge}>
          <Feather name="map-pin" size={12} color="#a8f0c6" />
          <Text style={styles.badgeText}>Calakmul, Campeche, México</Text>
        </View>

        <Text style={styles.title}>Descubre{"\n"}Calakmul</Text>
        <Text style={styles.subtitle}>
          La gran ciudad maya. Patrimonio Mundial de la UNESCO en el corazón de Campeche.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2,500+</Text>
            <Text style={styles.statLabel}>Años de historia</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7,000</Text>
            <Text style={styles.statLabel}>Km² de biosfera</Text>
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
    backgroundColor: "rgba(255,255,255,0.13)",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    gap: 6,
  },
  badgeText: {
    color: "#a8f0c6",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.4,
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
    maxWidth: "88%",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
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
    color: "#a8f0c6",
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
