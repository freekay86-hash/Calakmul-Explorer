import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";
import SectionTitle from "./SectionTitle";

const { width: W } = Dimensions.get("window");

const DESTINOS = [
  {
    id: "calakmul",
    titulo: "Calakmul",
    texto:
      "Majestuosa ciudad maya declarada Patrimonio de la Humanidad. Sus pirámides emergen entre la selva y ofrecen vistas impresionantes de la biosfera.",
    imagen: require("@/assets/images/hero_calakmul.png"),
    distancia: "60 km desde Xpujil",
    duracion: "Todo el día",
    dificultad: "Moderada",
  },
  {
    id: "murcielagos",
    titulo: "Cueva de los Murciélagos",
    texto:
      "Espectáculo natural único al atardecer. Millones de murciélagos emergen en espiral hacia el cielo formando un tornado viviente.",
    imagen: require("@/assets/images/bat_cave.png"),
    distancia: "45 km desde Xpujil",
    duracion: "Tarde/Noche",
    dificultad: "Fácil",
  },
  {
    id: "hotel",
    titulo: "Hotel Mundo Maya",
    texto:
      "Comodidad y naturaleza en perfecta armonía en medio de la selva. El lugar ideal para descansar después de explorar.",
    imagen: require("@/assets/images/hotel.png"),
    distancia: "5 km desde Xpujil",
    duracion: "Estadía",
    dificultad: "Sin dificultad",
  },
  {
    id: "balamku",
    titulo: "Balamkú",
    texto:
      "Sitio arqueológico rodeado de historia y misterio. Famoso por su extraordinario friso estucado de 17 metros de largo.",
    imagen: require("@/assets/images/balamku.png"),
    distancia: "55 km desde Xpujil",
    duracion: "Medio día",
    dificultad: "Fácil",
  },
  {
    id: "otros",
    titulo: "Otros Destinos",
    texto:
      "Chicannà, Becán, Hormiguero y más sitios arqueológicos únicos en la región Río Bec de Campeche.",
    imagen: require("@/assets/images/tour.png"),
    distancia: "Varios",
    duracion: "Varios",
    dificultad: "Variable",
  },
];

export default function DestinosSection() {
  const colors = useColors();
  const [active, setActive] = useState(0);
  const dest = DESTINOS[active];

  return (
    <View style={[styles.section, { backgroundColor: colors.sectionBg1 }]}>
      <View style={styles.titleWrap}>
        <SectionTitle
          title="Destinos"
          subtitle="Explora los lugares más impresionantes de la región"
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsScroll}
      >
        {DESTINOS.map((d, i) => (
          <TouchableOpacity
            key={d.id}
            style={[
              styles.pill,
              {
                backgroundColor: active === i ? colors.primary : colors.muted,
                borderColor: active === i ? colors.primary : colors.border,
              },
            ]}
            onPress={() => setActive(i)}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.pillText,
                { color: active === i ? "#ffffff" : colors.mutedForeground },
              ]}
            >
              {d.titulo}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.mainCard}>
        <View style={styles.imageContainer}>
          <Image
            key={dest.id}
            source={dest.imagen}
            style={styles.mainImage}
            contentFit="cover"
            transition={300}
          />
          <View style={[StyleSheet.absoluteFill, styles.imageOverlay]} />
          <View style={styles.imageContent}>
            <Text style={styles.mainTitle}>{dest.titulo}</Text>
            <View style={styles.distRow}>
              <Feather name="map-pin" size={13} color="rgba(255,255,255,0.8)" />
              <Text style={styles.distText}>{dest.distancia}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.infoPanel, { backgroundColor: colors.card }]}>
          <Text style={[styles.destText, { color: colors.foreground }]}>{dest.texto}</Text>

          <View style={styles.metaRow}>
            <View style={[styles.metaChip, { backgroundColor: colors.sectionBg2 }]}>
              <Feather name="clock" size={13} color={colors.primary} />
              <Text style={[styles.metaLabel, { color: colors.foreground }]}>{dest.duracion}</Text>
            </View>
            <View style={[styles.metaChip, { backgroundColor: colors.sectionBg2 }]}>
              <Feather name="activity" size={13} color={colors.secondary} />
              <Text style={[styles.metaLabel, { color: colors.foreground }]}>{dest.dificultad}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 36,
  },
  titleWrap: {
    paddingHorizontal: 20,
  },
  pillsScroll: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 20,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  mainCard: {
    marginHorizontal: 20,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  imageContainer: {
    width: "100%",
    height: 220,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    backgroundColor: "rgba(15,36,24,0.3)",
  },
  imageContent: {
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  mainTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontFamily: "Inter_700Bold",
  },
  distRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },
  distText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
  },
  infoPanel: {
    padding: 18,
  },
  destText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 21,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    gap: 10,
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  metaLabel: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
});
