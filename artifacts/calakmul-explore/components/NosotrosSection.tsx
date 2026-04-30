import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import SectionTitle from "./SectionTitle";

const FEATURES = [
  {
    icon: "award" as const,
    title: "Experiencia Certificada",
    desc: "Guías locales certificados con más de 10 años de experiencia en la zona maya.",
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
    desc: "Comprometidos con la conservación de la biosfera y las comunidades locales.",
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
      Animated.spring(rotX, { toValue: 0, useNativeDriver: true }).start();
      Animated.spring(rotY, { toValue: 0, useNativeDriver: true }).start();
    },
  });

  return (
    <View style={[styles.section, { backgroundColor: colors.sectionBg1 }]}>
      <SectionTitle
        title="¿Quiénes Somos?"
        subtitle="Tu aliado perfecto para explorar la grandeza de Calakmul"
      />

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            transform: [
              { perspective: 800 },
            ],
          },
        ]}
      >
        <View style={[styles.cardHeader, { backgroundColor: colors.primary }]}>
          <Feather name="compass" size={28} color="#ffffff" />
          <Text style={styles.cardHeaderTitle}>Calakmul Explore</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={[styles.cardText, { color: colors.foreground }]}>
            Somos una empresa 100% local dedicada a ofrecer experiencias auténticas e inolvidables en la Reserva de la Biosfera de Calakmul. Nuestro equipo de guías nativos te llevará a descubrir los secretos de la antigua civilización maya y la espectacular biodiversidad de la selva campeche.
          </Text>
        </View>
      </Animated.View>

      <View style={styles.featuresGrid}>
        {FEATURES.map((f, i) => (
          <View
            key={i}
            style={[styles.featureCard, { backgroundColor: colors.muted, borderColor: colors.border }]}
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
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cardHeaderTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Inter_700Bold",
  },
  cardBody: {
    padding: 20,
  },
  cardText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
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
