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
      "Majestuosa ciudad maya declarada Patrimonio de la Humanidad. Sus pirámides emergen entre la selva de Campeche y ofrecen vistas impresionantes de la biosfera hasta el horizonte.",
    imagen: require("@/assets/images/pyramid_front.jpeg"),
    imagenExtra: require("@/assets/images/aerial_jungle.jpeg"),
    distancia: "60 km desde Xpujil",
    duracion: "Todo el día",
    dificultad: "Moderada",
  },
  {
    id: "chicanna",
    titulo: "Chicannà",
    texto:
      "Sitio arqueológico con impresionantes fachadas de monstruos de la tierra. Sus elaboradas máscaras de piedra representan la entrada al inframundo maya.",
    imagen: require("@/assets/images/chicanna_facade.jpeg"),
    imagenExtra: require("@/assets/images/chicanna2.jpeg"),
    distancia: "12 km desde Xpujil",
    duracion: "Medio día",
    dificultad: "Fácil",
  },
  {
    id: "balamku",
    titulo: "Balamkú",
    texto:
      "Sitio arqueológico famoso por su extraordinario friso estucado de 17 metros. Alberga tallados únicos de ranas, cocodrilos y figuras humanas emergiendo de las fauces de la tierra.",
    imagen: require("@/assets/images/mayan_door.jpg"),
    imagenExtra: require("@/assets/images/ruins_entrance.jpeg"),
    distancia: "55 km desde Xpujil",
    duracion: "Medio día",
    dificultad: "Fácil",
  },
  {
    id: "laguna",
    titulo: "Lagunas de la Biosfera",
    texto:
      "Cuerpos de agua cristalinos en el corazón de la selva de Calakmul. Paraíso para la observación de aves acuáticas, caimanes y la exuberante flora tropical.",
    imagen: require("@/assets/images/lagoon.jpeg"),
    imagenExtra: require("@/assets/images/monkeys_tree.jpeg"),
    distancia: "Dentro de la biosfera",
    duracion: "Mañana",
    dificultad: "Fácil",
  },
  {
    id: "xpuhil",
    titulo: "Xpuhil y Becán",
    texto:
      "Sitios arqueológicos de la región Río Bec con torres altísimas que imitan pirámides. Becán, conocido como la ciudad rodeada por agua, tiene un foso defensivo único en el mundo maya.",
    imagen: require("@/assets/images/xpuhil_ruins.png"),
    imagenExtra: require("@/assets/images/pyramid_top_view.jpeg"),
    distancia: "En Xpujil / 8 km",
    duracion: "Medio día",
    dificultad: "Fácil",
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
          subtitle="Los lugares más impresionantes de Calakmul, Campeche"
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
            transition={350}
          />
          <View style={[StyleSheet.absoluteFill, styles.imageOverlay]} />
          <View style={styles.imageContent}>
            <Text style={styles.mainTitle}>{dest.titulo}</Text>
            <View style={styles.distRow}>
              <Feather name="map-pin" size={13} color="rgba(255,255,255,0.85)" />
              <Text style={styles.distText}>{dest.distancia}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.infoPanel, { backgroundColor: colors.card }]}>
          <Text style={[styles.destText, { color: colors.foreground }]}>{dest.texto}</Text>

          <View style={[styles.extraImg]}>
            <Image
              key={dest.id + "_extra"}
              source={dest.imagenExtra}
              style={styles.extraImgInner}
              contentFit="cover"
              transition={300}
            />
          </View>

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
    backgroundColor: "rgba(10,28,18,0.38)",
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
    color: "rgba(255,255,255,0.85)",
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
    marginBottom: 14,
  },
  extraImg: {
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 14,
  },
  extraImgInner: {
    width: "100%",
    height: "100%",
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
