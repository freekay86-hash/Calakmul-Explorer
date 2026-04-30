import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import SectionTitle from "./SectionTitle";
import WildlifeTrack from "./WildlifeTrack";

const FEATURES = [
  {
    icon: "award" as const,
    title: "Experiencia Certificada",
    desc: "Guías locales certificados con más de 10 años explorando Calakmul.",
  },
  {
    icon: "shield" as const,
    title: "Viajes Seguros",
    desc: "Protocolos de seguridad y equipo de primera para tu tranquilidad.",
  },
  {
    icon: "users" as const,
    title: "Grupos Pequeños",
    desc: "Máximo 8 personas por tour para una experiencia personalizada.",
  },
  {
    icon: "heart" as const,
    title: "Turismo Responsable",
    desc: "Comprometidos con la conservación de la biosfera de Calakmul.",
  },
];

export default function NosotrosSection() {
  const colors = useColors();
  const rotX = useRef(new Animated.Value(0)).current;
  const rotY = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, g) => {
      const x = (g.dx / 150) * 8;
      const y = -(g.dy / 150) * 8;
      rotY.setValue(x);
      rotX.setValue(y);
    },
    onPanResponderRelease: () => {
      Animated.spring(rotX, { toValue: 0, useNativeDriver: Platform.OS !== "web" }).start();
      Animated.spring(rotY, { toValue: 0, useNativeDriver: Platform.OS !== "web" }).start();
    },
  });

  return (
    <View style={[styles.section, { backgroundColor: colors.sectionBg2 }]}>
      <WildlifeTrack color="#2d9e5f" opacity={0.1} />
      <SectionTitle
        title="¿Quiénes Somos?"
        subtitle="Tu aliado perfecto para explorar la grandeza de Calakmul, Campeche"
      />

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <Image
          source={require("@/assets/images/aerial_jungle.jpeg")}
          style={styles.cardImg}
          contentFit="cover"
        />
        <View style={[styles.cardImgOverlay, { backgroundColor: colors.primary }]}>
          <Feather name="compass" size={22} color="#ffffff" />
          <Text style={styles.cardImgText}>Calakmul Explore</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={[styles.cardText, { color: colors.foreground }]}>
            Somos una empresa 100% local dedicada a ofrecer experiencias auténticas en la Reserva de la Biosfera de Calakmul, Campeche. Nuestro equipo de guías nativos te llevará a descubrir los secretos de la civilización maya y la espectacular biodiversidad de la selva.
          </Text>
        </View>
      </Animated.View>

      <View style={styles.wildPhoto}>
        <Image
          source={require("@/assets/images/monkeys_tree.jpeg")}
          style={styles.wildPhotoImg}
          contentFit="cover"
        />
        <View style={[styles.wildPhotoTag, { backgroundColor: colors.primary }]}>
          <Feather name="camera" size={13} color="#fff" />
          <Text style={styles.wildPhotoTagText}>Fauna silvestre en Calakmul</Text>
        </View>
      </View>

      <View style={styles.featuresGrid}>
        {FEATURES.map((f, i) => (
          <View
            key={i}
            style={[styles.featureCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={[styles.featureIcon, { backgroundColor: colors.primary }]}>
              <Feather name={f.icon} size={20} color="#ffffff" />
            </View>
            <Text style={[styles.featureTitle, { color: colors.foreground }]}>{f.title}</Text>
            <Text style={[styles.featureDesc, { color: colors.mutedForeground }]}>{f.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingVertical: 36,
    overflow: "hidden",
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
  },
  cardImg: {
    width: "100%",
    height: 160,
  },
  cardImgOverlay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardImgText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Inter_700Bold",
  },
  cardBody: {
    padding: 18,
  },
  cardText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  wildPhoto: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 20,
    height: 130,
  },
  wildPhotoImg: {
    width: "100%",
    height: "100%",
  },
  wildPhotoTag: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  wildPhotoTagText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  featureCard: {
    width: "47%",
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    marginBottom: 6,
  },
  featureDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    lineHeight: 17,
  },
});
